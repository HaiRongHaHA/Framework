import { observe } from ".";

let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(Array.prototype)

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort',
]

methods.map(method=>{   // AOP切片编程
    arrayMethods[method] = function(...args){
        let result = oldArrayProtoMethods[method].call(this,...args)
        // 用户新增的数据有可能是响应式的（对象）
        // 数组新增数据的方法
        let inserted;
        let ob = this.__ob__
        switch(method){
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':  // splice(0,1,xxx)
                inserted = args.slice(2)
            default:
                break;
        }
        if(inserted) ob.observeArray(inserted)
        ob.dep.notify()
        return result
    }
})
