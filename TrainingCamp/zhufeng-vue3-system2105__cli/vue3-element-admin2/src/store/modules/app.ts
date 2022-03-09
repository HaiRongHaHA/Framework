import { Module, MutationTree, ActionTree } from 'vuex'
import { RootStateTypes, AppStateTypes } from '@/store/interface'

const mutations: MutationTree<AppStateTypes> = {
  TOGGLE_SIDEBAR (state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  SET_SIZE (state, payload) {
    state.size = payload
  }
}

const actions: ActionTree<AppStateTypes, RootStateTypes> = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setSize ({ commit }, params) {
    commit('SET_SIZE', params)
  }
}

const app: Module<AppStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    sidebar: { // 定义sidebar相关状态
      opened: true // 菜单导航展开时true 收缩时false
    },
    size: 'medium'
  },
  mutations,
  actions
}
export default app
