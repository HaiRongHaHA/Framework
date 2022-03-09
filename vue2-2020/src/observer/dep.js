let id = 0
class Dep{
    constructor(){
        this.id = id++
        this.subs = []  //属性要记住watcher
    }
    depend(){
        // 让watcher记住dep，Dep.target就是watcher
        Dep.target.addDep(this)
    }
    addSub(watcher){    // dep存储watcher
        this.subs.push(watcher)
    }
    notify(){
        this.subs.map(watcher=> watcher.update())
    }
}
// 可以把当前渲染watcher放到一个全局变量上
Dep.target = null

export function pushTarget(watcher){
    Dep.target = watcher
}
export function popTarget(){
    Dep.target = null
}

export default Dep