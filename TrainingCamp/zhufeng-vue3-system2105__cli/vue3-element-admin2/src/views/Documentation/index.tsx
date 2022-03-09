import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Documentation',
  setup () {
    return () => <div>
      缓存测试：
      <input type="text" />
    </div>
  }
})
