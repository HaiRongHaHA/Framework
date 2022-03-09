import { defineComponent, ref, reactive, onMounted, getCurrentInstance } from 'vue'
import logo from '@/assets/logo.png'
import './index.scss'
import { ElForm } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import useRouteQuery from '@/hooks/useRouteQuery'

type IElFormInstance = InstanceType<typeof ElForm>

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false) // 登录加载状态
    const loginFormRef = ref<IElFormInstance | null>(null)
    const usernameRef = ref<HTMLInputElement | null>(null)
    const passwordRef = ref<HTMLInputElement | null>(null)
    const { proxy } = getCurrentInstance()!

    const loginState = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名！'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码！'
          }
        ]
      },
      passwordType: 'password'
    })

    // 显示密码
    const showPwd = () => {
      loginState.passwordType = loginState.passwordType === 'password' ? 'text' : 'password'
    }

    // 重定向router query处理
    const { redirect, otherQuery } = useRouteQuery()

    // 登录
    const handleLogin = () => {
      (loginFormRef.value as IElFormInstance).validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            await store.dispatch('user/login', loginState.loginForm)
            proxy?.$message.success('登录成功')
            router.push({
              path: redirect.value || '/',
              query: otherQuery.value
            })
          } finally {
            loading.value = false
          }
        } else {
          console.log('error submit!!')
        }
      })
    }

    // 自动获取焦点
    onMounted(() => {
      if (loginState.loginForm.username === '') {
        (usernameRef.value as HTMLInputElement).focus()
      } else if (loginState.loginForm.password === '') {
        (passwordRef.value as HTMLInputElement).focus()
      }
    })

    return () => <div class="login-container">
      <el-form
        class="login-form"
        model={loginState.loginForm}
        rules={loginState.loginRules}
        ref={loginFormRef}>
        <div class="admin-logo">
          <img class="logo" src={logo} alt="logo" />
          <h1 class="name">Vue3 Admin</h1>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user"></svg-icon>
          </span>
          <el-input
            ref={usernameRef}
            placeholder="请输入用户名"
            v-model={loginState.loginForm.username}
            autocomplete="off"
            tabindex="1"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input
            ref={passwordRef}
            class={{ 'no-autofill-pwd': loginState.passwordType === 'password' }}
            placeholder="请输入密码"
            v-model={loginState.loginForm.password}
            autocomplete="off"
            tabindex="2"
          />

          <span class="show-pwd" onClick={showPwd}>
            <svg-icon icon-class={loginState.passwordType === 'password' ? 'eye' : 'eye-open'} />
          </span>
        </el-form-item>

        {/* 登录按钮 */}
        <el-button
          type="primary"
          style=" width: 100%; margin-bottom: 30px"
          loading={loading.value}
          onClick={handleLogin}
        >Login</el-button>
      </el-form>
    </div>
  }
})
