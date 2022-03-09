import { computed, defineComponent } from 'vue'
import ThemePicker from '@/components/ThemePicker'
import { useStore } from '@/store'

export default defineComponent({
  setup () {
    const store = useStore()
    const tagsView = computed({
      get () {
        // 获取store中tagsView状态
        return store.state.settings.tagsView
      },
      set (val) {
        // switch修改后 派发action同步store中tagsview值
        store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    })

    const showSidebarLogo = computed({
      get () {
        return store.state.settings.sidebarLogo
      },
      set (val) {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })

    return () => <div class="drawer-container">
      <div class="drawer-item">
        <span>主题色</span>
        <ThemePicker />
      </div>

      {/* 显示|隐藏面包屑 */}
      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model={tagsView.value} class="drawer-switch" />
      </div>

      {/* 侧边栏logo */}
      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model={showSidebarLogo.value} class="drawer-switch" />
      </div>
    </div>
  }
})
