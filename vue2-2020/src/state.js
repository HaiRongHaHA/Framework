import {observe} from './observer/index'
/*
    vue的数据有n种，数据顺序：props methods data computed watch
*/

// 初始化状态
export function initState(vm){
    const opts = vm.$options
    if(opts.data){  // 数据初始化
        initData(vm)
    }
}


function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newVal){
            vm[source][key] = newVal
        }
    })
}

// 初始化数据
function initData(vm){
    let data = vm.$options.data 
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    
    for(let key in data){
        proxy(vm,'_data',key)
    }

    observe(data)
}