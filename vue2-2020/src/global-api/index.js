import { mergeOptions } from "../util";

export function initGlobalAPI(Vue){
    Vue.options = {}; // 用来存储全局的配置
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this;
    }

    Vue.options._base = Vue; // Vue的构造函数 后面会用到
    Vue.options.components = {}; // 用来存放组件的定义
    // id组件名 definition组件对象
    Vue.component = function (id, definition) {
        definition.name = definition.name || id;
        // 通过对象产生一个构造函数
        definition = this.options._base.extend(definition); 
        this.options.components[id] = definition;
    }

    let cid = 0;
    Vue.extend = function (options) {
        const Super = this; // 保证super永远指向父类大Vue
        // 子组件初始化时会new VueComponent(options)
        const Sub = function VueComponent(options){
            this._init(options);
        }
        Sub.cid = cid++;
        Sub.prototype = Object.create(Super.prototype);// 都是通过Vue继承来的
        Sub.prototype.constructor = Sub;
        Sub.component = Super.component;
        // 每次声明一个组件 都会把父级的定义放在自己的身上
        Sub.options = mergeOptions(
            Super.options,  // Vue的options
            options)
        return Sub;// 这个构造函数是由对象产生而来的
    }
}