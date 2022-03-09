import { defineComponent, KeepAlive, resolveDynamicComponent, Transition, Component, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from '@/store'

const Home = defineComponent({
  setup () {
    const store = useStore()
    const cachedViews = computed(() => store.state.tagsView.cachedViews)

    const routerViewSlot = ({ Component }: { Component: Component }) => {
      return <Transition name="fade-transform" mode="out-in" appear>
        <KeepAlive include={cachedViews.value as string[]}>
          {resolveDynamicComponent(Component)}
        </KeepAlive>
      </Transition>
    }

    return () => (
      <div class="app-main">
        <h2>app main h2</h2>
        <RouterView v-slots={routerViewSlot}></RouterView>
      </div>
    )
  }
})

export default Home
