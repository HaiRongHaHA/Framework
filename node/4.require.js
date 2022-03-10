const path = require("path")
const fs = require("fs")
const vm = require("vm")

class Module {
  id
  exports = {}
  constructor(id) {
    this.id = id
  }

  load() {
    const extension = path.extname(this.id)
    Module._extensions[extension](this)
  }

  static _resolveFilename(filename) {
    const filePath = path.resolve(__dirname, filename)
    const exists = fs.existsSync(filePath)
    if (exists) return filePath

    // 尝试添加.js .json 后缀
    let keys = Reflect.ownKeys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
      const newPath = filePath + keys[i]
      if (fs.existsSync(newPath)) return newPath
    }
    throw new Error("module not found")
  }

  static _extensions = {
    ".js"(module) {
      const script = fs.readFileSync(module.id, "utf-8")
      const template = `(function(exports,module,require,__filename,__dirname){${script}})`
      // require __filename __dirname 全局变量
      // module抛给外面js，用户自己会写 module.exports
      const compileFunction = vm.runInThisContext(template)
      const exports = module.exports // 文件内使用exports单独导出某个属性时
      const thisValue = exports // this = exports = module.exports = {}
      const filename = module.id
      const dirname = path.dirname(filename)
      compileFunction.call(
        thisValue,
        exports,
        module,
        MyRequire,
        filename,
        dirname
      )
      // module.exports 和 exports.x 不支持同时使用
    },
    ".json"(module) {
      const script = fs.readFileSync(module.id, "utf-8")
      module.exports = JSON.parse(script)
    },
  }

  static _cache = {}
}

function MyRequire(filename) {
  const filePath = Module._resolveFilename(filename)

  let exists = Module._cache[filePath]
  if (exists) {
    return exists.exports
  }

  // 创建一个模块
  let module = new Module(filePath)
  Module._cache[filePath] = module

  // 获取模块内容，包装函数，（用户的逻辑会给 module.exports 赋值）
  module.load()

  return module.exports
}

let js = MyRequire("./4.test-require")
js = MyRequire("./4.test-require") // 缓存了只会执行一遍
console.log(js, "js模块")

const json = MyRequire("./4.test-require.json")
console.log(json, "json模块")

// setInterval(() => {
//   const js = MyRequire("./4.test-require")
//   console.log(js, "js模块定时器")
// }, 1000)
