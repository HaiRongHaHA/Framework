
export function patch(oldVnode, vnode){
    // oldVnode 是一个真实的元素
    if(!oldVnode){
        return createElm(vnode); // 根据虚拟节点创建元素
    }
    
    // 首次渲染oldVnode是一个真实的元素
    const isRealElement = oldVnode.nodeType
    if(isRealElement){
        // 初次渲染
        const oldElm = oldVnode // id="app"
        const parentElm = oldElm.parentNode;  // body
        // (初始化渲染时，会创建一个新节点并将老节点删掉)
        let el = createElm(vnode)    // 根据虚拟节点创建真实节点
        parentElm.insertBefore(el, oldElm.nextSibling)  // 将创建节点插到原有节点的下一个
        parentElm.removeChild(oldElm)   // 将原有节点删除
        return el   // vm.$el

    } else {
        // diff算法
    }
}


function createComponent(vnode){
    // 有hook的说明是组件
    let i = vnode.data;
    if((i = i.hook) && (i = i.init)){
        i(vnode); // 调用组件的初始化方法 // vnode.componentInstance.$el
    }
    // 如果虚拟节点上有组件的实例说明当前这个vode是组件
    if(vnode.componentInstance){
        return true;
    }
    return false;
}

// 根据虚拟节点创建真实节点
function createElm(vnode){
    let {tag, children, key, data, text, vm} = vnode
    if(typeof tag === 'string'){
        // 可能是组件, 如果是组件 就直接根据组件创建出组件对应的真实节点
        if(createComponent(vnode)){
            // 如果返回true 说明这个虚拟节点是组件
            // 如果是组件，就将组件渲染后的真实元素给我
            return vnode.componentInstance.$el
        }

        vnode.el = document.createElement(tag)  // 用vue指令时候能通过vnode拿到真实dom
        updateProperties(vnode)
        children.map(child=>{
            vnode.el.appendChild(createElm(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }

    return vnode.el
}


function updateProperties(vnode){
    let newProps = vnode.data || {}
    let el = vnode.el

    for (const key in newProps) {
        if(key == 'style'){
            for (const styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if(key == 'class'){
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}