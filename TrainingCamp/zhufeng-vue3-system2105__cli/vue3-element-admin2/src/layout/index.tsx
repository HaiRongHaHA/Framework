import { computed, defineComponent, ref } from 'vue'

import './index.scss'
import Sidebar from '@/layout/components/Sidebar/index'
import AppMain from '@/layout/components/AppMain'
import Navbar from '@/layout/components/Navbar'
import TagsView from '@/layout/components/TagsView'
import RightPanel from '@/components/RightPanel'
import Settings from '@/layout/components/Settings'
import varibalse from '@/styles/variables.scss'
import { useStore } from '@/store'

const Home = defineComponent({
  setup () {
    const store = useStore()
    // rightPanel显示隐藏状态
    const showSetting = ref(false)

    const openSetting = () => {
      showSetting.value = true
    }

    // 是否显示tagsview
    const showTagsView = computed(() => store.state.settings.tagsView)

    return () => (
      <div class="app-wrapper">
        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-container">
          <div class="header">
            <Navbar {...{ onShowSetting: openSetting }} />
            {showTagsView.value ? <TagsView /> : ''}
          </div>
          <AppMain />
        </div>
        <RightPanel
          v-model={showSetting.value}
          title="样式风格设置"
          size={varibalse.settingPanelWidth}>
          <Settings />
        </RightPanel>
      </div>
    )
  }
})

export default Home
