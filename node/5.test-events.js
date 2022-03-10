const EventEmitter = require("./5.events") // 发布订阅 事件模块
class Eat extends EventEmitter{}
const events = new Eat

// process.nextTick(() => { // nextTick可以解决异步调用问题，方式优于promise.then
//   events.emit("吃饭了")
// })

function washHands() {
  console.log("洗手")
}


function eatSoup() {
  console.log("喝汤")
}

events.once("吃饭了", washHands)
events.off("吃饭了", washHands)

events.on("吃饭了", eatSoup)

events.on("吃饭了", (name) => {
  console.log("吃啥？", name)
})

events.off("吃饭了", eatSoup)

events.emit("吃饭了", "火锅")
events.emit("吃饭了", "串串香")
