import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { query, params } = route

    router.replace({
      path: '/' + params.path,
      query
    })
    return () => h('template')
  }
}
