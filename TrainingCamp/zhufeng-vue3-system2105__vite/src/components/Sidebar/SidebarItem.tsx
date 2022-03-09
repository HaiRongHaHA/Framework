import {
  computed, defineComponent, PropType, toRefs,
} from 'vue';
import { RouteRecordRaw } from 'vue-router';
import './index.scss';
import { resolve } from 'path';

export const SidebarItem = defineComponent({
  props: {
    item: { // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: { // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { item } = toRefs(props);
    // 渲染菜单主要先看子路由
    // 比如我们的路由 一级路由一般都是layout组件 二级路由才是我们考虑要渲染成菜单的

    // 子路由数量
    const showingChildNumber = computed(() => {
      // hidden路由排除掉 只算可渲染子路由
      const children = (props.item.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) return false;
        return true;
      });
      return children.length;
    });

    // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
    // theOnlyOneChildRoute直接通过el-menu-item组件来渲染
    const theOnlyOneChildRoute = computed(() => {
      // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
      if (showingChildNumber.value > 1) {
        return null;
      }

      // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
      // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
      if (item.value.children) {
        item.value.children.map((child) => {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        });
      }

      // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '', // resolvePath避免resolve拼接时 拼接重复
      };
    });

    // menu icon
    const icon = computed(() => theOnlyOneChildRoute.value?.meta?.icon
      || (props.item.meta && props.item.meta.icon));

    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
    // resolvePath在模板中使用
    // const resolvePath = (childPath: string) => resolve(props.basePath, childPath);

    const resolvePath = (childPath: string) => {
      console.log(childPath, 'childPath', props.basePath);

      // resolve(props.basePath, childPath);
      return childPath;
    };

    const slots = {
      default: () => <>
        <svg-icon class="menu-icon" icon-class={icon} ></svg-icon>
      </>,
      title: () => <span>{theOnlyOneChildRoute.value?.meta?.title}</span>,
    };

    // 多个子路由
    const subSlots = {
      default: () => <>
        {
          props.item.children
          && props.item.children.map((v) => {
            <SidebarItem
              is-nest="true"
              item={v}
              basePath={resolvePath(v.path)}
            >
            </SidebarItem>;
          })
        }
      </>,
      title: () => <>
        <svg-icon
          class="menu-icon"
          icon-class={props.item.meta && props.item.meta.icon}
        ></svg-icon>
        <span class="submenu-title">{props.item.meta && props.item.meta.title}</span>
      </>,
    };

    return () => <div class="sidebar-item-container">
      {theOnlyOneChildRoute.value && !theOnlyOneChildRoute.value.children
        ? <el-menu-item index="1" v-slots={slots} />
        : <el-submenu
          index={resolvePath(item.value.path)}
          popper-append-to-body
          v-slots={subSlots}
        >
        </el-submenu>
      }
    </div>;
  },
});
