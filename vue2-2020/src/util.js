let callbacks = []
let wait = false

function flushCallbacks(){
    for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i];
        callback()
    }
    wait = false
    callbacks = []
}

export function nextTick(cb){
    callbacks.push(cb)
    if(!wait){
        wait = true
        /*
            批处理操作加锁
            多次调用nextTick只会开启一个
            更新操作时异步，但渲染执行时同步的
        */ 
        Promise.resolve().then(flushCallbacks)
    }
}

export const isObject = (val) => typeof val == 'object' && val != null;

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted'
]
const strats = {};  // 策略

strats.components = function(parantVal, childVal) {
    const res = Object.create(parantVal);
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key];
        }
    }
    return res;
}

function mergeHook(parentVal, childVal) {
    if (childVal) { // 如果儿子有
        if (parentVal) {
            return parentVal.concat(childVal);
        } else { // 如果儿子有父亲没有
            return [childVal]
        }
    } else {
        return parentVal; // 儿子没有直接采用父亲
    }
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child){
    const options = {};
    // {a:1}  {a:2}  => {a:2}
    // {a:1}  {}  => {a:1}
    // 自定义的策略
    // 1.如果父亲有的儿子也有，应该用儿子替换父亲
    // 2.如果父亲有值儿子没有，用父亲的
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }

    function mergeField(key) {
        // 钩子策略模式
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key]);
        }
        if (isObject(parent[key]) && isObject(child[key])) {
            options[key] = { ...parent[key], ...child[key] }
        } else {
            if (child[key]) { // 如果儿子有值
                options[key] = child[key];
            } else {    // 爸爸有儿子没
                options[key] = parent[key];
            }
        }
    }
    return options;
}

function makeUp(str) {
    const map = {}
    str.split(',').forEach(tagName => {
        map[tagName] = true;
    })
    return (tag) => map[tag] || false
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button')