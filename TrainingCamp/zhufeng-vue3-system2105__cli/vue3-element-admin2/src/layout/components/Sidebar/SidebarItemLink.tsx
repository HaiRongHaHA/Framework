import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup (props, { slots }) {
    // 判断接收的路径 是不是外链
    const isExt = computed(() => isExternal(props.to))

    const linkProps = computed(() => {
      if (isExt.value) {
        return { // a 标签的一些原生属性
          href: props.to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // router-link只需一个to props
      return {
        to: props.to
      }
    })
    return () => isExt.value
      ? <a {...linkProps.value}>
        {slots.default && slots.default()}
      </a>
      : <router-link {...linkProps.value} v-slots={slots}></router-link>
  }
})
