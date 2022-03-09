/*
服务端全局变量原则上是global，但node在执行时为了实现模块化，
会在执行代码时，外部包装一个函数，这个函数在执行的时候会改变this指向
*/
// console.log(this)

// 浏览器中是window setImmediate 是node自己实现的
// console.log(global)

// 查看全部的属性
// console.dir(global, { showHidden: true })

/*  
node globals对象 api地址: https://nodejs.org/docs/latest-v14.x/api/globals.html

我们需要掌握的：

Buffer
process

以下5个属性都可以直接访问，但是不能通过global来访问，
它们只能算全局变量（node在最外层包装的函数参数），而不能算是全局对象的属性

__dirname
__filename
exports
module
require

*/

// ------------------- process -------------------

// console.log(Object.keys(process)) // 所有process属性

// 1、platform 平台
// 不同平台的用户目录都不一样的
// windows -> win32
// mac -> darwin
console.log("系统平台: ", process.platform)

// 2、arch 操作系统CPU体系结构 系统位数
console.log("系统位数: ", process.arch)

// 3、cwd current working directory(你在哪执行的这个文件)
// 获取执行命令时的路径
// 应用场景：webpack执行时，会查找配置文件，在当前执行命令的路径下查找
console.log("获取执行命令时的路径: ", process.cwd())
console.log("文件所在位置: ", __filename) // 文件所在位置 绝对路径
console.log("文件所在目录: ", __dirname) // 文件所在目录 绝对路径

// 4、env 环境变量
// 默认我们代码在执行时会去读取电脑中的环境
// console.log(process.env); // 执行命令的时候，设置变量 可以通过env读取
// windows下用set设置
// mac下用export设置
// corss-env(第三方包) 适应不同平台环境
// windows cmd执行命令： set NODE_ENV=dev & node 1.node-base-api.js
console.log("[NODE_ENV]环境变量: ", process.env.NODE_ENV)

// 5、argv 执行命令时所带的参数
// 默认的有两个参数，1.可执行node.exe 2.执行的文件位置，所以一般都排除它们两
// cmd执行命令： node 1.node-base-api.js --port 3000 --config .env
// 拿到的是个数组，需要处理一下
const args = process.argv.slice(2)
console.log("执行命令的参数argv：", args)

// commander 命令行管家 第三方包
// 默认提供一个 --help
// cmd执行命令： node 1.node-base-api.js --version
const { program } = require("commander")
program.version("0.0.1")
program.parse(process.argv) // commander执行命令的参数

// 6、nextTick node独有的事件环 浏览器是没有的，浏览器没有进程的概念
process.nextTick(()=>{
// 异步，微任务，不属于事件环的一部分，下一队列，本轮任务执行完毕后，会立即执行回调函数
  console.log('nextTick');
})
Promise.resolve().then(()=>{ // Promise也不属于node中的事件环
  console.log('Promise');
})
// node中自己实现了一个事件环机制（新版本的node执行结构和浏览器执行的结构一致）底层实现方式不太一样
// 对于浏览器宏任务只有一个队列, 对于node而言, 创造了多个队列
// node指南中文: https://nodejs.org/zh-cn/docs/guides/
