import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Hooks from './hook'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

Hooks(router)

export default router
