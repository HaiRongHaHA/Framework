import { defineComponent, computed } from 'vue'
import { isExternal } from '@/utils/validate'
import './index.scss'

const Home = defineComponent({
  inheritAttrs: false, // 组件上的$attrs不自动添加到组件根元素上 默认添加到组件根元素上
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: { // 我们也可以自定义类名
      type: String,
      default: ''
    }
  },
  setup (props, { attrs }) {
    // 是否是带协议的图片链接
    const isExt = computed(() => isExternal(props.iconClass || ''))

    // 拼接成symbolId 在loader配置中指定了symbolId格式 icon-图标名称
    const iconName = computed(() => `#icon-${props.iconClass}`)

    // 添加类名 props.className外部传入自定义类名
    const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'))

    // 如果iconClass是带协议的图标链接 则通过style css属性方式渲染
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }))

    return () => (
      <>
        <div
          class="svg-icon svg-external-icon"
          v-show={isExt.value}
          style={styleExternalIcon.value}
          {...attrs}
        ></div>
        <svg
          v-show={!isExt.value}
          class={svgClass.value}
          aria-hidden="true"
          {...attrs}>
          <use xlinkHref={iconName.value} />
        </svg>
      </>
    )
  }
})

export default Home
