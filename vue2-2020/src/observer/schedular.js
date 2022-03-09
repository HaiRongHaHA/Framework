import { nextTick } from "../util";

let has = {}
let queue = []
let pending = false

function flushSchedularQueue(){
    for (let i = 0; i < queue.length; i++) {
        const watcher = queue[i];
        watcher.run()
    }
    queue = []
    has = {}
    pending = false
}


export function queueWatcher(watcher) { // 调度更新几次
    // 更新时对watcher进行去重操作
    let id = watcher.id;
    if(has[id] == null){ // 没有id 
        queue.push(watcher);
        has[id] = true;
        if(!pending){
            pending = true
            nextTick(flushSchedularQueue)
        }
    }
}
