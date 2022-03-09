
import { defineComponent, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded, RouteRecordRaw, useRouter } from 'vue-router'
import { useStore } from '@/store'
import routes from '@/router/routes'
import path from 'path'
import ScrollPanel from '@/components/ScrollPanel'

// 右键菜单
enum TagCommandType {
  All = 'all',
  Other = 'other',
  Self = 'self',
  Refresh = 'refresh'
}

export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    // 从store里获取 可显示的tags view
    const visitedTags = computed(() => store.state.tagsView.visitedViews)

    // 过滤所有需要固定的路由直接显示
    const fillterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
      let tags: RouteLocationNormalizedLoaded[] = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          // 把路由路径解析成完整路径，路由可能是相对路径
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: { ...route.meta }
          } as RouteLocationNormalizedLoaded)
        }

        // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
        if (route.children) {
          const childTags = fillterAffixTags(route.children, route.path)
          if (childTags.length) {
            tags = [...tags, ...childTags]
          }
        }
      })
      return tags
    }

    // 初始化需要显示的路由
    const initTags = () => {
      const affixTags = fillterAffixTags(routes)
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch('tagsView/addView', tag)
        }
      }
    }

    // 添加当前路由（当前路由不一定是要固定的）
    const addTags = () => {
      const { name } = route

      if (name) {
        store.dispatch('tagsView/addView', route)
      }
    }

    // 路径发生变化追加tags view
    watch(() => route.path, () => {
      addTags()
    })

    // 最近当前router到tags view
    onMounted(() => {
      initTags()
      addTags()
    })

    // 是否是当前应该激活的tag
    const isActive = (tag: RouteLocationNormalizedLoaded) => {
      return tag.path === route.path
    }

    // 定义到下一个卡片
    const toLastView = (
      visitedViews: RouteLocationNormalizedLoaded[],
      view: RouteLocationNormalizedLoaded) => {
      const lastView = visitedViews[visitedViews.length - 1]

      if (lastView) {
        router.push(lastView.fullPath)
      } else {
        // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          // tag都没有了 删除的也不是Dashboard 只能跳转首页
          router.push('/')
        }
      }
    }

    // 关闭当前右键的tag路由
    const closeSelectedTag = async (view: RouteLocationNormalizedLoaded, e?: Event) => {
      e?.stopPropagation()
      e?.preventDefault()
      await store.dispatch('tagsView/delView', view)
      if (isActive(view)) {
        toLastView(visitedTags.value, view)
      }
    }

    // 是否是始终固定在tagsview上的tag
    const isAffix = (tag: RouteLocationNormalizedLoaded) => {
      return tag.meta && tag.meta.affix
    }

    // 关闭所有标签
    const handleCloseAllTag = async (view: RouteLocationNormalizedLoaded) => {
      // 对于是affix的tag是不会被删除的
      await store.dispatch('tagsView/delAllView')
      // 关闭所有后 就让切换到剩下affix中最后一个tag
      toLastView(visitedTags.value, view)
    }

    // 删除其他tag 除了当前右键的tag
    const handleCloseOtherTag = async (view: RouteLocationNormalizedLoaded) => {
      await store.dispatch('tagsView/delOthersViews', view)
      // 删除其他tag后 让该view路由激活
      if (!isActive(view)) {
        router.push(view.path)
      }
    }

    // 右键刷新 清空当前对应路由缓存
    const refreshSelectedTag = async (view: RouteLocationNormalizedLoaded) => {
      // 刷新前 将该路由名称从缓存列表中移除
      await store.dispatch('tagsView/delCachedView', view)
      const { fullPath } = view
      nextTick(() => {
        router.replace('/redirect' + fullPath)
      })
    }

    // 右键菜单
    const handleTagCommand = (command: TagCommandType, view: RouteLocationNormalizedLoaded) => {
      switch (command) {
        case TagCommandType.All:
          handleCloseAllTag(view)
          break
        case TagCommandType.Other:
          handleCloseOtherTag(view)
          break
        case TagCommandType.Self:
          closeSelectedTag(view)
          break
        case TagCommandType.Refresh: // 刷新当前右键选中tag对应的路由
          refreshSelectedTag(view)
          break
      }
    }

    const dropDownSlot = (tag: RouteLocationNormalizedLoaded) => {
      return {
        default: () => <span>
          {tag.meta?.title}
          {
            !isAffix(tag)
              ? <span
                class="el-icon-close"
                onClick={(e) => closeSelectedTag(tag, e)}
              ></span> : ''
          }
        </span>,
        dropdown: () => <el-dropdown-menu>
          <el-dropdown-item command="refresh">刷新</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          {
            !tag.meta || !tag.meta.affix
              ? <el-dropdown-item command="self">关闭</el-dropdown-item>
              : ''
          }
        </el-dropdown-menu>
      }
    }

    // 获取主题色
    const themeColor = computed(() => store.getters.themeColor)

    return () => <ScrollPanel>
      <div class="tags-view-container">
        {/* <div class="tags-view-wrapper"> */}
        {
          visitedTags.value.map((tag: RouteLocationNormalizedLoaded) =>
            <router-link
              class={['tags-view-item', isActive(tag) ? 'active' : '']}
              to={{ path: tag.path, query: tag.query, fullPath: tag.fullPath }}
              tag="span"
              style={{
                'background-color': isActive(tag) ? themeColor.value : '',
                'border-color': isActive(tag) ? themeColor.value : ''
              }}
            >
              <el-dropdown
                trigger="contextmenu"
                onCommand={(command: TagCommandType) => handleTagCommand(command, tag)}
                v-slots={dropDownSlot(tag)} />
            </router-link>
          )
        }
        {/* </div> */}
      </div>
    </ScrollPanel>
  }
})
