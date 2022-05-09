import { createApp } from "vue"
import App from "./app.vue"
import { ZIcon } from "@z-plus/components/icon"

import "@z-plus/theme-chalk/src/index.scss"

const app = createApp(App) // 编写play组件为测试入口
app.use(ZIcon)

app.mount("#app")
