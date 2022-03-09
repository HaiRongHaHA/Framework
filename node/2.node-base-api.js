/*
  node常用模块
  1.内置核心模块
  2.文件模块引用
  3.第三方模块
*/

// fs
const fs = require("fs")
// require 读取文件的操作 同步语法

// 读取文件前,文件不存在
const exists = fs.existsSync("./node.md")
if (exists) {
  // 同步会阻塞,代码执行前都可以采用同步的方式
  const data = fs.readFileSync("./node.md", "utf-8")
}

// path
const path = require("path")

// join 拼接路径
console.log(path.join('a','//b','c'));
// .. 表上一级
console.log(path.join('a','/b','c','..'));

// resolve 拼接路径是绝对路径
// 遇到/表示的根路径, 默认以当前路径(process.cwd())解析成绝对路径
console.log(path.resolve('a','b','c'));
console.log(path.resolve('a','b','c','..'));

// 加__dirname根目录后, resolve带/的路径会解析成根路径
console.log(path.join(__dirname,'/a'));
console.log(path.resolve(__dirname,'/a'));

// 取文件名
console.log(path.basename('abc.js','.js'));

// 取文件后缀
console.log(path.extname('abc.js'));

// 获取当前的相对路径
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));

// 等价与 __dirname, 内部__dirname就是这样产生的
console.log(path.dirname(__filename));

// vm 开发时基本用不到, 可以让一个字符串执行
const vm = require("vm")

// eval 执行的时候会采用上级的变量
global.c = 100
eval('console.log(c)')

// new Function
const sum = new Function('a','b','return a+b+c')
console.log(sum(1,2));

// eval和new Function可能会受外界因素影响,不安全
// node的vm沙箱执行,实现一个全新的上下文
// vm.runInNewContext('console.log(c)') // c is not defined


// 思考题: js中如何实现沙箱机制? 尝试实现一下,快照和proxy实现