import { Module, ActionTree, MutationTree } from 'vuex'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { TagsViewState, RootStateTypes } from '@/store/interface'

const mutations: MutationTree<TagsViewState> = {
  // 添加可显示tags view
  ADD_VISITED_VIEW (state, view: RouteLocationNormalizedLoaded) {
    // 过滤过重复的path（已经存在的路由）
    if (state.visitedViews.some(v => v.path === view.path)) return

    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'tag-name'
    }))
  },
  // 如果路由meta.noCache没有 默认或为false代表进行缓存，为true不缓存
  // 默认缓存所有路由
  ADD_CACHED_VIEW (state, view) {
    // 只有路由有name才可缓存集合keep-alive inludes使用
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 可删除指定的一个view
  DEL_VISITED_VIEW (state, view: RouteLocationNormalizedLoaded) {
    const i = state.visitedViews.indexOf(view)
    if (i > -1) {
      state.visitedViews.splice(i, 1)
    }
  },
  // 可删除指定的一个view缓存
  DEL_CACHED_VIEW (state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 清空可显示列表
  DEL_ALL_VISITED_VIEWS (state) {
    // 对于affix为true的路由 tag view 是不能删除的
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  // 清空缓存列表
  DEL_ALL_CACHED_VIEWS (state) {
    state.cachedViews = []
  },

  // 删除标签导航其他可显示tag 除了 affix为true 以及当前右键选中的view
  DEL_OTHERS_VISITED_VIEWS (state, view) {
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix || (tag.path === view.path))
  },

  // 删除缓存列表里其他tag 除了当前右键选中的view
  DEL_OTHERS_CACHED_VIEWS (state, view) {
    state.cachedViews = state.cachedViews.filter(name => name !== view.name)
  }
}

const actions: ActionTree<TagsViewState, RootStateTypes> = {
  // 添加tags view
  addView ({ dispatch }, view: RouteLocationNormalizedLoaded) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },

  // 添加可显示的tags view 添加前commit里需要进行去重过滤
  addVisitedView ({ commit }, view: RouteLocationNormalizedLoaded) {
    commit('ADD_VISITED_VIEW', view)
  },

  // 添加可缓存的标签tag
  addCachedView ({ commit }, view: RouteLocationNormalizedLoaded) {
    commit('ADD_CACHED_VIEW', view)
  },

  // 删除tags view
  async delView ({ dispatch }, view: RouteLocationNormalizedLoaded) {
    await dispatch('delVisitedView', view)
    // 删除对应缓存的路由
    await dispatch('delCachedView', view)
  },

  // 从可显示的集合中 删除tags view
  delVisitedView ({ commit }, view: RouteLocationNormalizedLoaded) {
    commit('DEL_VISITED_VIEW', view)
  },

  // 从缓存列表删除指定tag view
  async delCachedView ({ commit }, view: RouteLocationNormalizedLoaded) {
    await commit('DEL_CACHED_VIEW', view)
  },

  // 清空 可显示列表 和 缓存列表
  async delAllView ({ dispatch }) {
    // 删除显示的路由tag
    await dispatch('delAllVisitedView')
    // 删除缓存的路由
    await dispatch('delAllCachedViews')
  },

  // 清空可显示列表
  delAllVisitedView ({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
  },

  // 清空缓存列表
  delAllCachedViews ({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  },
  // 关闭其他tag
  delOthersViews ({ dispatch }, view: RouteLocationNormalizedLoaded) {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
  },
  // 关闭其他可显示tag
  delOthersVisitedViews ({ commit }, view: RouteLocationNormalizedLoaded) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
  },
  // 关闭其他缓存tag
  delOthersCachedViews ({ commit }, view: RouteLocationNormalizedLoaded) {
    commit('DEL_OTHERS_CACHED_VIEWS', view)
  }
}

const tagsView: Module<TagsViewState, RootStateTypes> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations,
  actions
}

export default tagsView
