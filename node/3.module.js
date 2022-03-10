// node中的模块
// 1.内置模块
// 2.第三方模块
// 3.文件模块(相对路径\绝对路径)

// 模块规范: commonjs esMoudle

// esMoudle 静态导入，import
// 在编译时就可以知道使用了哪些变量，可以实现tree-shaking，一开始就都请求了
// * es7有import动态导入提案

// commonjs 动态导入
// 不支持tree-shaking，用到的时候才请求文件
// 1.使用require导入, 导入文件后缀可省略,默认会查找.js文件,没有.js就找.json
// 2.如果模块需要被外界使用,就要导出具体的内容 module.export
// 3.在node中每个.js .json文件都是一个模块
// 4.一个包中含有多个模块，（每个包都必须配置package.json文件）

// commonjs动态导入原理
// 1.读取文件
// 2.包装函数，设置 moudle,exports,require,__dirname,__filename 等参数
// 3.包装函数里默认返回 module.exports 对象
const r = require("./1.node-base-api")

// node 调试
// 借助浏览器中调试node（不推荐）
// 1.node --inspect-brk 3.module.js
// 2.chrome://inspect 打开对应的调式地址

// vscode中调试
// 配置launch.json

// require 实现原理
// 1.实现一个require方法
// 2.Module._load 实现模块的加载
// 2.Module._resolveFilename 把文件名解析成一个绝对路径
// 4.实现模块的缓存(根据绝对路径进行模块的缓存)
// *: .module.exports会在第一次缓存起来(导出结果,引用类型内部修改了会跟着变,普通值是不会跟着变的),后续再去使用,会取上次的返回值
// *: es6的模块使用 export {} 导出的是一个变量,如果内部对应值发生变化外部是有影响的.
// 5.会尝试加载是不是一个原生模块,如果带相对路径\绝对路径就不是核心模块
// 6.创建一个模块,根据文件路径来创建(模块有3个属性 id,path,exports(后续导出的结果需保存到这个变量上))
// 7.模块的加载,根据创建的模块进行加载
// 8.记载模块时会创建一个paths属性(第三方模块查找路径)
// 9.取出文件的后缀 Module._extensions 调用对应加载模块的策略
// 10.读取文件内容(字符串)
// 11.在文件内容外包裹一个函数
// *: export = module.export
// 12.最终require方法会拿到module.export返回结果

// 总结：最终用户使用的结果都来自于 module.exports ，如果只是改变 exports 引用，不会影响module.export的值，但是给 exports 增添属性，是可以修改 module.exports的，注意不要同时使用 exports 和 module.exports，否则返回module.exports结果

// 直接操作global属性，就可以不用导出（不提倡，污染全局变量）