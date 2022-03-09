import { defineComponent } from 'vue'
import { useGenerateTheme } from '@/hooks/useGenerateTheme'

export default defineComponent({
  setup () {
    useGenerateTheme()
    return () => <router-view />
  }
})
