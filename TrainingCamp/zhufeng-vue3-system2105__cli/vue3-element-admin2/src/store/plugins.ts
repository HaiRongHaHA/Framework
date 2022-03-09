import createPersistedState from 'vuex-persistedstate'

// vuex store持久化 默认使用localstorage持久化
const persisteAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
  // paths: ['app'] // 针对app这个模块持久化
  // 只针对app模块下sidebar.opened状态持久化
  paths: ['app.sidebar.opened', 'app.size'] // 通过点连接符指定state路径
})

const persisteSettingsState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_settings',
  paths: ['settings.theme', 'settings.originalStyle', 'settings.sidebarLogo']
})

export default [
  persisteAppState,
  persisteSettingsState
]
