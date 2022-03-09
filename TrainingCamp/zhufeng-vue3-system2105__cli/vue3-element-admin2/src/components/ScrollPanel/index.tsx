import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, { slots }) {
    return () => <el-scrollbar
      wrap-class="scroll-wrapper"
      v-slots={slots}
    />
  }
})
