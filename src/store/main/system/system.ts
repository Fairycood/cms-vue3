import { Module } from 'vuex'
import { IRootState } from '../../type'
import { ISystemState } from './type'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/network/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    }
  },
  getters: {
    pageListData: (state) => (pageName: string) => {
      return (state as any)[`${pageName}List`]
    },
    pageListCount: (state) => (pageName: string) => {
      return (state as any)[`${pageName}Count`]
    }
  },
  actions: {
    //获取页面列表数据
    async getPageListAction({ commit }, payload: any) {
      //获取pageurl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      //对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    //删除列表的数据
    async deletePageDataAction({ dispatch }, payload: any) {
      //获取url
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      //发送删除请求
      await deletePageData(url)
      //重新获取列表数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    //新建列表数据
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageData(url, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    //编辑表格数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const url = `/${pageName}/${id}`
      await editPageData(url, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
