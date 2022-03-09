import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
import { SidebarItem } from './SidebarItem'
import routes from '@/router/routes'
import { useStore } from '@/store'
import Logo from './Logo'
import ScrollPanel from '@/components/ScrollPanel'

export default defineComponent({
  setup () {
    const route = useRoute()
    const store = useStore()

    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const { path, meta } = route
      // 如果指定了高亮的path则直接返回

      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    // scss变量
    const scssVariables = computed(() => variables)

    // 菜单展开收起状态 后面会放store里
    const isCollapse = computed(() => !store.getters.sidebar.opened)

    // 渲染路由
    const menuRoutes = computed(() => routes)

    // 获取主题色
    const themeColor = computed(() => store.getters.themeColor)

    // 是否显示logo
    const showLogo = computed(() => store.state.settings.sidebarLogo)

    return () => <>
      {showLogo.value ? <Logo collapse={isCollapse.value}/> : ''}
      <ScrollPanel>
        <el-menu
          class="sidebar-container-menu"
          mode="vertical"
          defaultActive={activeMenu.value}
          backgroundColor={scssVariables.value.menuBg}
          textColor={scssVariables.value.menuText}
          activeTextColor={themeColor.value}
          collapse={isCollapse.value}
          collapseTransition={true}
        >
          {
            menuRoutes.value.map((v) => (
              <SidebarItem
                item={v}
                basePath={v.path} />
            ))
          }
        </el-menu>
      </ScrollPanel>
    </>
  }
})
