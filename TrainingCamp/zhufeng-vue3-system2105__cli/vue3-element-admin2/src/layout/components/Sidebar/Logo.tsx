import { defineComponent, Transition } from 'vue'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const title = 'Vue Element Admin'
    const logo = require('@/assets/logo.png')

    return () => <div class={['sidebar-logo-container', props.collapse ? 'collapse' : '']}>
      <Transition name="sidebarLogoFade">
        <router-link
          key={props.collapse ? 'collapse' : 'expand'}
          to="/"
          class="sidebar-logo-link"
        >
          {
            logo ? <img
              src={logo}
              class="sidebar-logo"
              alt="VueElementAdmin" />
              : <h1 class="sidebar-title">{title}</h1>
          }
        </router-link>
      </Transition>
    </div>
  }
})
