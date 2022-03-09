import {arrayMethods} from './array'
import Dep from "./dep";

// 观测类
class Observer{
    constructor(value){
        this.dep = new Dep() // 给数组本身和对象本身增加的一个dep属性
        /*
           定义了一个类的自定义属性（供数组重写方法新增响应式数据调用）
           但是__ob__是Observer类，也是个对象也会被代理上，造成死循环
           所以用Object.defineProperty '__ob__'的写法避免这个问题
        */  
        // value.__ob__ = this
        Object.defineProperty(value,'__ob__',{
            value: this,
            enumerable: false,// 不能被枚举 不能被循环
            configurable:false //不能删除此属性
        })
        if(Array.isArray(value)){
            // 数组不用defineProperty代理，性能不好（会有多少项代理多少个监听）
            value.__proto__ = arrayMethods
            // Object.setPrototypeOf(value,arrayMethods)
            this.observeArray(value)    //观测数据里的每一项（原有数组中的对象）
        } else {
            this.walk(value)
        }
    }
    // 数组观测方法
    observeArray(value){
        for (let i = 0; i < value.length; i++) {
            observe(value[i])
        }
    }

    // 对象观测方法
    walk(data){
        Object.keys(data).map(key=>{
            defineReactive(data,key,data[key])
        })
    }
}

// 内层数据收集外层数组的依赖，这样修改里层数组也可以更新视图
function dependArray(value){
    for (let i = 0; i < value.length; i++) {
        const current = value[i];
        current.__ob__ && current.__ob__.dep.depend()   // 让里程的和外层收集的都是同一个watcher
        if(Array.isArray(current)){
            dependArray(current)
        }
    }
}

// vue2中数据不要定义过深，浪费性能
export function defineReactive(data,key,value){
    // value可能是一个对象
    let childOb = observe(value)  // 对结果递归
    let dep = new Dep() // 每次都给属性创建一个dep 给对象内的（属性）某一项加的
    Object.defineProperty(data,key,{
        get(){
            if(Dep.target){ 
                /*
                    让这个属性自己的dep记住这个watcher，
                    也要让watcher记住这个dep（双向过程）
                */ 
                dep.depend()
                // childOb  可能是数组，也可能是对象（对象增加属性时也需要更新）
                if(childOb){    // 如果对数组取值 会将当前watcher和数组关联
                    childOb.dep.depend()
                    if(Array.isArray(value)){
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newVal){
            if(newVal === value) return
            observe(newVal) // 如果用户设置的是一个对象，就继续讲此对象变成响应式的
            value = newVal
            dep.notify()    // 通知dep中记录watcher去执行
        }
    })
}

export function observe(data){
    if(typeof data !== 'object' || data == null) return
    if(data.__ob__) return  // 对象被观测过了不再观测
    return new Observer(data)
}