import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
// 导入scss变量在组件中使用
// import variables from '@/styles/variables.module.scss';
import { SidebarItem } from '@/components/Sidebar/SidebarItem';
import routes from '@/router/routes';

export default defineComponent({
  setup() {
    const route = useRoute();

    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const { path } = route;
      return path;
    });

    const variables = {
      menuBg: '#304156',
      menuText: '#bfcbd9',
      menuActiveText: '#409eff',
    };

    // scss变量
    const scssVariables = computed(() => variables);

    // 菜单展开收起状态 后面会放store里
    const isCollapse = ref(true);

    // 切换展开收起
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    // 渲染路由
    const menuRoutes = computed(() => routes);

    return () => <>
      <h6 onClick={toggleCollapse}>展收测试</h6>

      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        default-active={activeMenu.value}
        background-color={scssVariables.value.menuBg}
        text-color={scssVariables.value.menuText}
        active-text-color={scssVariables.value.menuActiveText}
        collapse={isCollapse.value}
        collapse-transition={true}
      >
        {
          menuRoutes.value.map((v) => (
            <SidebarItem
              item={v}
              basePath={v.path} />
          ))
        }
      </el-menu>
    </>;
  },
});
