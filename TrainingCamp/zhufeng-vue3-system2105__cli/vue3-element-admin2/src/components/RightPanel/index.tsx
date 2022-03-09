import { defineComponent, PropType } from 'vue'

enum Direction {
  rtl='rtl',
  ltr='ltr',
  ttb='ttb',
  btt='btt',
}

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'rtl'
    },
    title: {
      type: String,
      default: '自定义title'
    },
    size: {
      type: [String, Number]
    },
    customClass: {
      type: String,
      default: 'setting-panel'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup (props, { emit, slots }) {
    const handleClose = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    return () => <div class="right-panel">
      <el-drawer
        model-value={props.modelValue}
        direction={props.direction}
        show-close={props.showClose}
        custom-class={props.customClass}
        with-header={props.withHeader}
        title={props.title}
        size={props.size}
        onClose={handleClose}
        v-slots={slots}/>
    </div>
  }
})
