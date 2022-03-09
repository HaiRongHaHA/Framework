// 调用自定义render方法

import { createElement, createTextVnode } from "./vdom/index"

export function renderMixin(Vue){
    Vue.prototype._c = function(...args){   // 创建元素vnode
        return createElement(this, ...args)
    }

    Vue.prototype._v = function(text){  // 创建文本vnode
        return createTextVnode(this, text)
    }

    Vue.prototype._s = function(val){   // 转换字符串
        return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
    }

    Vue.prototype._render = function(){
        const vm = this
        let render = vm.$options.render
        let vnode = render.call(vm) // _c(xxx,xxx,xxx)调用时会自动将变量进行取值，将实例结果渲染
        return vnode
    }
}