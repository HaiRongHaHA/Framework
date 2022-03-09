import { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./schedular";

let id = 0;
// 用作于渲染watcher
class Watcher{
    constructor(vm, exprOrFn, cb, options){
        this.vm = vm
        this.cb = cb
        this.options = options
        this.id = id++
        this.deps = []
        this.depsId = new Set()
        this.getter = exprOrFn
        this.get()  // 调用传入得函数调用了render方法此时会对模板中数据进行取值
    }

    get(){  // 这个方法会对属性取值操作
        pushTarget(this)    // Dep.target=this，当前watcher
        this.getter()   // 会走_render会取值
        popTarget()
    }
    
    // watcher存dep（去重，不然模板取重复的值每次都记录是不合理的）
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){   // dep不重复，watcher肯定也不会重复
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

    run(){
        this.get()
    }

    update(){   // 如果多次更新，合并成一次（相当于防抖）
        // 把dep清空，clearDep源码中有，此处省略
        queueWatcher(this)
    }
    // 当属性取值时，需要记住这个watcher，数据变化了，去执行自己记住得watcher即可
}

export default Watcher


/*
    1、默认渲染时将渲染watcher放到Dep.target上

    2、当我们调用this.getter时就会对属性进行取值操作，每个key都有一个dep，
    渲染watcher存在时，将dep和watcher进行双向绑定

    3、渲染后，让Dep.target值为null，不在模板中访问的值，不记录watcher

    4、修改数据值后，会找到当前key所对应的dep，通知dep中的watcher执行更新视图
*/ 