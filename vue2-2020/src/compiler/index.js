import { generate } from "./generate"
import { parseHtml } from "./parse"

export function compileToFunctions(template){
    let ast = parseHtml(template)
    let code = generate(ast)  // 生成代码
    let render = `with(this){return ${code}}`;
    let renderFn = new Function(render);    // 让一个字符串变成一个函数，eval属于不干净得执行
    return renderFn
}