
import { defineComponent, getCurrentInstance } from 'vue'
import avatar from '@/assets/logo.png'
import { useStore } from '@/store'

export default defineComponent({
  setup () {
    const store = useStore()
    const { proxy } = getCurrentInstance()!
    const logout = () => {
      store.dispatch('user/logout').then(() => {
        proxy?.$message.success('退出登录')
        window.location.reload()
      })
    }

    const elDropdownSlot = {
      default: () => <div class="avatar-wrapper">
        <img src={avatar} class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>,
      dropdown: () => <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人设置</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided onClick={logout}>
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    }

    return () => <div><el-dropdown class="avatar-container" v-slots={elDropdownSlot}/></div>
  }
})
