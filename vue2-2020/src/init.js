import { compileToFunctions } from './compiler/index'
import { callHook, mountComponent } from './lifecycle'
import { initState } from './state'
import { mergeOptions, nextTick } from './util'

export function initMixin(Vue){ // 表示在vue的基础上做一次混合操作
    Vue.prototype._init = function(options) {
        const vm= this
        vm.$options = mergeOptions(vm.constructor.options, options);
        // 初始化状态
        callHook(vm,'beforeCreate');
        initState(vm);
        callHook(vm,'created');
        if(vm.$options.el){ // 数据可以挂载到页面上
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$nextTick = nextTick

    Vue.prototype.$mount = function(el){
        // 源码中有判断是否是一个dom或字符串，此版省略
        el = el && document.querySelector(el)
        const vm = this
        const options = vm.$options
        
        vm.$el = el
        
        /*
            如果有render直接用render
            没有render看有没有template属性
            没有template 就接着找外部模板
        */
        if(!options.render){
            let template = options.template
            if(!template && el){
                template = el.outerHTML // 火狐不兼容 document.createElement('div').append('app').innnerHTML
            }

            // 将模板编译成render函数
            const render = compileToFunctions(template)
            options.render = render

        }

        mountComponent(vm, el)  // 组件挂载


    }
}