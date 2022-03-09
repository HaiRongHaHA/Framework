import { initGlobalAPI } from './global-api/index'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'

function Vue(options){
    this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue) // _update
renderMixin(Vue) // _render

initGlobalAPI(Vue); // 混合全局的api


export default Vue