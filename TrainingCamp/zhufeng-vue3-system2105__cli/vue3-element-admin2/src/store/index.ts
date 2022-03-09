import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { RootStateTypes } from './interface'
import getters from './getters'
import plugins from './plugins'
import app from './modules/app'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import user from './modules/user'
import role from './modules/role'

export default createStore<RootStateTypes>({
  plugins,
  getters,
  modules: {
    app,
    tagsView,
    settings,
    user,
    role
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

/**
 * @function useStore useStore方法封装
 * @returns {object} store实例
 */
export function useStore<T = RootStateTypes> () {
  return baseUseStore<T>(key)
}
