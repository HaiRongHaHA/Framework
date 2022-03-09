const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // xx-xx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;    // xx:xx
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
    

export function parseHtml(html){
    /*
        根据开始/结束/文本内容 生成一个ast语法树
        vue3支持多个根元素（外层加了一个空元素），vue2只有一个根节点
    */ 
    function createASTElement(tag,attrs){
        return {
            tag,
            type:1,
            children:[],
            attrs,
            parent:null
        }
    }

    let root = null;
    let currenParent;
    let stack = []  // [div,span]

    function start(tagName,attrs){
        let element = createASTElement(tagName,attrs)
        if(!root) {
            root = element
        }
        currenParent = element  // div>span>a
        stack.push(element)
    }

    function end(tagName){
        let element = stack.pop()
        currenParent = stack[stack.length-1]
        if(currenParent){
            element.parent = currenParent
            currenParent.children.push(element)
        }
    }

    function chars(text){
        text = text.replace(/\s/g,'')
        if(text){
            currenParent.children.push({
                type:3,
                text
            })
        }
    }

    function advance(n){    // 解析一个token删一个
        html = html.substring(n)
    }

    function parseStartTag(){
        let start = html.match(startTagOpen)
        if(start){
            let match = {
                tagName: start[1],
                attrs:[]
            }
            advance(start[0].length)
            // 不是开头/结尾标签就一直解析
            let end,attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
                advance(attr[0].length) // a=1 a="1" a='1'
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4]  || attr[5] || true
                })
            }
            if(end){    // 去掉>结尾
                advance(end[0].length)
                return match
            }
        }
    }

    while(html){
        let textEnd =  html.indexOf('<')    // 开始/结束标签
        if(textEnd == 0){
            let startTagMatch = parseStartTag()
            if(startTagMatch) { // 开始标签
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue;
            }

            // 结束标签
            let endTagMatch = html.match(endTag)
            if(endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue;
            }
        }
        let text;
        if(textEnd > 0){    // 开始解析文本
            text = html.substring(0,textEnd)
        }
        if(text){
            advance(text.length)
            chars(text)
        }
    }
    return root
}