import { createStore } from 'vuex'

import { IRootState } from './type'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/network/main/system/system'

export default createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenus: []
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenus(state, list) {
      state.entireMenus = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeEntireDepartment', departmentList)

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)

      const menusResult = await getPageListData('/menu/list', {})
      const { list: menusList } = menusResult.data
      commit('changeEntireMenus', menusList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
