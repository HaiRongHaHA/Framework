/*
    ts自带类型推导功能
    什么时候标识类型，什么时候不用标识？
*/
let name    // 当没有赋值的时候，默认推导为any类型
name = '344'
name = 1
name = true

// 默认在初始化是会举行类型推导的
let name1 = 323
// name1='434' // 默认推导为数字类型了，赋值字符串报错

// ______________________________

// number-Number string-String

// 在使用基本数据类型时，会将原始类型包装成对象类型
22..toString() // Number(11).toString 装包
11.3.toString()

let number:number =22
let number2:number =Number(22)
// let number3:number =new Number(22) // new Number是个对象，不能将实例赋值给基本类型number
// 类也是个类型，可以描述实例
let number3:Number =new Number(22)  
let string:String =new String('dfgdfg')  



export {}