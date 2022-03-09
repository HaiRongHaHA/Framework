import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import { useGenerateTheme } from '@/hooks/useGenerateTheme'

export default defineComponent({
  setup () {
    const store = useStore()
    // 预设可选颜色
    const themeColor = ['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']
    // store中获取默认主题色
    const defaultTheme = computed(() => store.state.settings.theme)
    const theme = ref('')

    // 主题生成方法 稍后
    const { generateTheme } = useGenerateTheme()

    // 监听默认样式
    watch(defaultTheme, value => {
      theme.value = value
    }, {
      immediate: true
    })

    // 根据theme选择变化 重新生成主题
    watch(theme, (value) => {
      // 同步store
      store.dispatch('settings/changeSetting', { key: 'theme', value })
      // 根据theme选择变化 重新生成主题
      generateTheme(value)
    })

    return () => <el-color-picker
      v-model={theme.value}
      class="theme-picker"
      predefine={themeColor}
      popper-class="theme-picker-dropdown"
    />
  }
})
