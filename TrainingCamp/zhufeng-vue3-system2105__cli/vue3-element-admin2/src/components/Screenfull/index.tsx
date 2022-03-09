
import { defineComponent, getCurrentInstance, ref } from 'vue'
import screenfull, { Screenfull } from 'screenfull'

export default defineComponent({
  inheritAttrs: false,
  setup (props, { attrs }) {
    const { proxy } = getCurrentInstance()!

    const isFullscreen = ref(false)

    const handleClick = () => {
      if (screenfull.isEnabled) { // 浏览器是否允许全屏模式
        screenfull.toggle()
        return
      }
      return proxy?.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
    }

    const change = () => {
      // 更新当前全屏状态 根据状态切换对应图标
      isFullscreen.value = (screenfull as Screenfull).isFullscreen
    }

    const init = () => {
      if (screenfull.isEnabled) { // 浏览器是否允许全屏模式
        // 监听全屏切换状态
        screenfull.on('change', change)
      }
    }

    init()

    return () => <svg-icon
      {...attrs}
      iconClass={isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'}
      onClick={handleClick}
    />
  }
})
