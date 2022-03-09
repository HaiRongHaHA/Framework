import { defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb'
import Hambuger from '@/components/Hambuger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Avatar from '@/components/Avatar'
import { useStore } from '@/store'
import './index.scss'

export default defineComponent({
  // emits: {
  //   showSetting: (status:boolean) => true
  // },
  emits: ['showSetting'],
  setup (props, { emit }) {
    const store = useStore()

    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
    }

    // 打开设置面板
    const openShowSetting = () => {
      emit('showSetting', true)
    }

    return () => <div class="navbar">
      <Hambuger
        {...{ onToggleClick: toggleSidebar }}
        isActive={store.getters.sidebar.opened} />
      <Breadcrumb />
      <div class="right-menu">
        {/* 设置 */}
        <div onClick={openShowSetting} class="setting right-menu-item hover-effect">
          <i class="el-icon-s-tools"></i>
        </div>
        {/* 全屏 id="screefull" */}
        <Screenfull class="right-menu-item hover-effect" />
        {/* element组件size切换 */}
        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip>
        <Avatar />
      </div>
    </div>
  }
})
