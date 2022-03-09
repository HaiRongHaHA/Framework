const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配{{xxx}}

function genProps(attrs){
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if(attr.name === 'style'){
            let obj = {}
            attr.value.split(';').map(v=>{
                let [key,value] = v.split(':')
                obj[key] = value
            })
            attr.value = obj;   // {color:xxx,width:xxx}
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},` // {a:'aaa',a:1,b:2,}
    }
    return `{${str.slice(0,-1)}}` // 把最后多出来,逗号删掉
}


function genChildren(el){
const children = el.children
if(children){
    return `${children.map(child=>gen(child)).join(',')}`
}
}

// 区分是元素还是文本
function gen(node){
    if(node.type == 1){
        return generate(node)
    } else {
        // 文本 有{{xx}}  普通文本 混合文本 {{xx}} xxx {{xx}} xxx
        let text = node.text;
        if(defaultTagRE.test(text)){    // 文本内是{{}}取值
            let lastIndex = defaultTagRE.lastIndex = 0, // 每次生成代码，需要把defaultTagRE.lastIndex变成0（解决正则exec和/g的冲突问题）
                tokens = [],
                index=0, 
                match;
            while(match = defaultTagRE.exec(text)){ // 将匹配到的结果赋给match
                index = match.index // 匹配到{{在总文本位置的下标
                if(index > lastIndex){  // {{前面有纯文本
                    tokens.push(JSON.stringify(text.slice(lastIndex, index)))
                }
                tokens.push(`_s(${match[1].trim()})`) // 匹配到的变量
                lastIndex = index + match[0].length // 匹配的下标+"{{xxx}}"长度
            }

            if(lastIndex < text.length) {   // 拼接}}后面的文本
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }

            return `_v(${tokens.join('+')})` // 变量拼接 'hello'+arr+'world'

        } else {
            return `_v(${JSON.stringify(text)})` // 纯文本
        }

    }
}

// 转换成render代码（语法转换） html=>js代码
export function generate(el){
let children = genChildren(el)

const props = el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'

children= children ? `${children}` : ''

let code = `_c('${el.tag}',${props},${children})`

return code
}