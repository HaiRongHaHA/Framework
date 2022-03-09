import {
  computed, defineComponent, PropType, toRefs
} from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import './index.scss'
import path from 'path'
import { isExternal } from '@/utils/validate'

export const SidebarItem = defineComponent({
  props: {
    item: { // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: { // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()

    const { item } = toRefs(props)

    // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) return false
        return true
      })

      return children.length
    })

    // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
    // theOnlyOneChildRoute直接通过el-menu-item组件来渲染
    const theOnlyOneChildRoute = computed(() => {
      // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
      if (showingChildNumber.value > 1) {
        return null
      }

      // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
      // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
      if (item.value.children) {
        const children = item.value.children.find((child) => {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        })
        if (children) return children
      }

      // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '' // resolvePath避免resolve拼接时 拼接重复
      }
    })

    // 是否有可渲染子路由
    const noShowingChildren = computed(() => showingChildNumber.value === 0)

    // menu icon
    const icon = computed(() => theOnlyOneChildRoute.value?.meta?.icon ||
      (props.item.meta && props.item.meta.icon))

    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
    // resolvePath在模板中使用
    const resolvePath = (childPath: string) => {
      // 如果是带协议外链 直接返回
      if (isExternal(childPath)) {
        return childPath
      }
      // 如果不是外链 需要和basePath拼接
      return path.resolve(props.basePath, childPath)
    }

    // 设置 alwaysShow: true，这样它就会忽略上面定义的规则，一直显示根路由 哪怕只有一个子路由也会显示为嵌套的路由菜单
    const alwaysShowRootMenu = computed(
      () => props.item.meta && props.item.meta.alwaysShow
    )

    // 是否只有一条可渲染路由
    const isRenderSingleRoute = computed(() => !alwaysShowRootMenu.value && (!theOnlyOneChildRoute.value?.children || noShowingChildren.value))

    // 单个路由slots
    const slots = {
      default: () => <>
        {
          icon?.value?.includes('el-icon')
            ? <i class={icon.value}></i>
            : <svgIcon class="menu-icon" iconClass={icon.value} ></svgIcon>
        }

      </>,
      title: () => <span>{theOnlyOneChildRoute.value?.meta?.title}</span>
    }

    // 多个子路由slots
    const subSlots = {
      default: () => <>
        {
          props.item.children &&
          props.item.children.map((v) =>
            <SidebarItem
              item={v}
              basePath={resolvePath(v.path)}
            >
            </SidebarItem>
          )
        }
      </>,
      title: () => <>
        {
         props.item.meta?.icon?.includes('el-icon')
           ? <i class={icon.value}></i>
           : <svgIcon class="menu-icon" iconClass={icon.value} ></svgIcon>
        }
        <span class="submenu-title">{props.item.meta && props.item.meta.title}</span>
      </>
    }

    // 跳转逻辑
    const linkTo = (path: string) => {
      const isExt = computed(() => isExternal(path))
      // 如果是外链打开新的标签页跳转
      if (isExt.value) {
        window.open(path)
      } else {
        router.push({ path })
      }
    }

    // 菜单渲染方法
    const sidebarItemRender = () => {
      const onlyOneChild = theOnlyOneChildRoute.value
      if (isRenderSingleRoute.value && onlyOneChild) {
        // 单个菜单渲染
        return onlyOneChild.meta
          ? <el-menu-item
            index={resolvePath(onlyOneChild.path)}
            v-slots={slots}
            onClick={linkTo.bind(this, resolvePath(onlyOneChild.path))} /> : ''
      } else {
        // 多个子菜单渲染
        return <el-submenu
          index={resolvePath(item.value.path)}
          popper-append-to-body
          v-slots={subSlots}
        />
      }
    }

    // hidden的菜单不渲染
    if (!props.item.meta || !props.item.meta.hidden) {
      return () => <div class="sidebar-item-container">{sidebarItemRender()}</div>
    }
  }
})
