import { GetterTree } from 'vuex'
import { RootStateTypes } from './interface'

// 定义全局getters
const getters: GetterTree<RootStateTypes, RootStateTypes> = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  themeColor: state => state.settings.theme
}

export default getters
