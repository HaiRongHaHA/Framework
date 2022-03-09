import { defineComponent, getCurrentInstance } from 'vue'
import './index.scss'

const Dashboard = defineComponent({
  name: 'Dashboard',
  setup () {
    const { proxy } = getCurrentInstance()!
    const sayHi = () => {
      proxy?.$message.success('哈哈哈')
    }

    return () => (
      <div>
        <h1>Dashboard page</h1>
      缓存测试：
        <input type="text" />
        <el-button type="primary">size改变</el-button>
        <svg-icon iconClass="bug"></svg-icon>
        <svg-icon iconClass="404" class-name="custom-class" onClick={sayHi}></svg-icon>
      </div>
    )
  }
})

export default Dashboard
