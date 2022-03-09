import Watcher from "./observer/watcher";
import { patch } from "./vdom/patch";
// 渲染真实dom文件

export function lifecycleMixin(Vue){
    Vue.prototype._update = function(vnode){
        // 将虚拟节点转换成真实dom
        const vm = this
        /*
            首次渲染 需要用虚拟节点来更新真实的dom
            后续的渲染需要diff对比
        */ 
        // vm.$el = patch(vm.$optionsv.el, vnode)
        vm.$el = patch(vm.$el, vnode)   // 组件调用patch方法会产生$el属性
    }
}

export function callHook(vm, hook){ 
    const handlers = vm.$options[hook];
    if(handlers){
        // 发布
        handlers.map(handler=>handler.call(vm));
    }
}

export function mountComponent(vm, el){

    // 默认vue是通过Watcher进行渲染得（每个组件一个渲染Watcher）
    let updateComponent = ()=>{
        vm._update(vm._render())    // 虚拟节点
    }

    new Watcher(vm, updateComponent, ()=>{},true)   // 等价于updateComponent()
}