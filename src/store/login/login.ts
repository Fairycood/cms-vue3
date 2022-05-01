import { Module } from 'vuex'

import { IRootState } from '../type'
import { ILoginState } from './type'
import { IAccount } from '@/network/type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/login/login'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
      //此处根据获取的userMenus动态创建对应的路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //此处根据获取的userMenus获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    //进行登陆验证
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登陆逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      dispatch('getInitialDataAction', null, { root: true })

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳转到首页
      router.push('/main')
    },
    //（页面刷新时）将localstorage中的用户信息赋值到vuex里
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      dispatch('getInitialDataAction', null, { root: true })
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
