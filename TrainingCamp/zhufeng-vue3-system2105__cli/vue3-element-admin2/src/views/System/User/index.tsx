import { computed, defineComponent, onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { ElForm } from 'element-plus'
import { Profile } from '@/store/interface'
import { useStore } from '@/store'
// import RightPanel from '@/components/RightPanel/index.vue'
import EditorUser from './components/EditorUser'

type ElFormInstance = InstanceType<typeof ElForm>
export default defineComponent({
  name: 'User',
  setup () {
    const { proxy } = getCurrentInstance()!
    const store = useStore()
    // 查询表单ref
    const queryFormRef = ref<ElFormInstance | null>(null)
    // 查询条件
    const formQuery = reactive({
      username: '',
      status: 'all',
      mobile: ''
    })
    // 用户列表
    const users = computed(() => store.state.user.users)
    // 用户总条数
    const total = computed(() => store.state.user.count)
    // 分页相关状态
    const pageNum = ref(0)
    const pageSize = ref(1)

    // 获取用户列表 支持分页
    const getUserList = () => {
      store.dispatch('user/getAllUsers', {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        ...formQuery
      })
    }

    onMounted(() => { // 初始加载数据
      getUserList()
    })

    // 查询
    const handleSubmitQuery = () => {
      getUserList()
    }
    // 重置
    const handleResetFeilds = () => {
      (queryFormRef.value as ElFormInstance).resetFields()
      getUserList()
    }

    // 分页
    const handleSizeChange = (val: number) => {
      pageSize.value = val
      getUserList()
    }
    const handleCurrentChange = (val: number) => {
      pageNum.value = val - 1 // 页码后端是从0开始的
      getUserList()
    }

    // 格式化status
    const formatter = (row: Profile) => {
      return row.status ? '正常' : '禁用'
    }

    // 用户新增
    const editData = ref<Profile | undefined>(undefined)
    // 控制面板显示
    const panelVisible = ref(false)
    // 操作类型 0编辑 1新增
    const editType = ref(1)
    // panel title
    const panelTitle = computed(() => editType.value === 1 ? '新增用户' : '编辑用户')

    // 获取角色 添加和编辑用户都需要分配角色 这里是必选
    store.dispatch('role/getRoles')

    const roles = computed(() => store.state.role.roles)
    // 添加用户
    const handleAddUser = () => {
      editType.value = 1
      editData.value = {} as Profile
      editData.value.roles = roles.value  // 所有角色列表
      editData.value.roleIds = [] // 所选角色id列表
      panelVisible.value = true
    }

    // 编辑用户
    const handleEditUser = (index: number, row: Profile) => {
      editType.value = 0
      editData.value = { ...row }
      // 获取当前编辑用户 现有角色列表
      editData.value.roleIds = row.roles.map(item => item.id)
      editData.value.roles = roles.value // 所有角色列表
      panelVisible.value = true
    }

    // 新增编辑 统一派发方法
    const dispatchAction = async (action: string, data: Partial<Profile>, message: string) => {
      await store.dispatch(action, {
        ...data,
        pageSize: pageSize.value,
        pageNum: pageNum.value
      }).then(() => {
        (queryFormRef.value as ElFormInstance).resetFields()
        proxy?.$message.success(message)
        panelVisible.value = false
      })
    }
    // 新增用户
    const addNewUser = (data: Profile) => {
      dispatchAction('user/addUser', data, '用户添加成功')
    }

    // 编辑用户
    const editUser = (data: Profile) => {
      dispatchAction('user/editUser', data, '用户编辑成功')
    }

    // 删除用户
    const handleDeleteUser = (index: number, row: Profile) => {
      proxy?.$confirm(`您确认要删除用户${row.username}吗？`, '删除确认', {
        type: 'warning'
      }).then(async () => {
        await dispatchAction('user/removeUser', {
          id: row.id
        }, '用户删除成功')
      }).catch((err: Error) => {
        console.log('err', err)
        proxy?.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    // 提交用户信息
    const handleSubmitUser = (data: Profile) => {
      if (editType.value === 1) { // 新增
        addNewUser(data)
      } else if (editType.value === 0) { // 编辑
        editUser(data)
      }
    }
    return () => <div class="user-container">
    <h2>用户管理</h2>
    <el-form inline={true} model={formQuery} ref="queryFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model={formQuery.username} placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model={formQuery.mobile} placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model={formQuery.status} placeholder="状态">
          <el-option label="全部" value="all"></el-option>
          <el-option label="禁用" value={0}></el-option>
          <el-option label="正常" value={1}></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" onClick={handleSubmitQuery}>查询</el-button>
        <el-button type="default" onClick={handleResetFeilds}>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="role-list">
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        onClick={handleAddUser}
      >添加用户</el-button>
      <el-table
        data={users}
        max-height="400"
      >
        <el-table-column
          prop="username"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          formatter={formatter}
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="150px"
        >
          {/* <template #default="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEditUser(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleDeleteUser(scope.$index, scope.row)">删除</el-button>
          </template> */}
        </el-table-column>
      </el-table>
      <div class="user-pagination">
        <el-pagination
          onSize-change={handleSizeChange}
          onCurrent-change={handleCurrentChange}
          background
          total={total}
          page-sizes={[1, 5, 10, 20]}
          page-size={pageSize}
          layout="total, prev, pager, next, sizes,jumper"
        ></el-pagination>
      </div>
    </div>
    {/* 新增角色 编辑角色面板 */}
    <right-panel v-model={panelVisible} title={panelTitle} size={330}>
      <editor-user
        type={editType}
        data={editData}
        onSubmit={handleSubmitUser}
      />
    </right-panel>
  </div>
  }
})
