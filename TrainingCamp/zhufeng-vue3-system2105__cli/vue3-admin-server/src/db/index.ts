import seq from './seq'
import './models/index'

// 测试连接
;(async () => { // 连接测试
  try {
    await seq.authenticate()
    console.log('@Connection has been established successfully.')
  } catch (error) {
    console.error('@Unable to connect to the database:', error)
  } 
})()

// 将所有定义的model同步更新到数据库
;(async () => { // model配置修改后 执行sync进行更新同步
  await seq.sync({ alter: true })
  console.log('@sync ok')
})()