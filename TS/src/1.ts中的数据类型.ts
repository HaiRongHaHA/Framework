// 基础类型
//所有类型 ：后面都i是类型 = 后面都是值
const str: string = 'hello'
const num: number = 12
const bool: boolean = true

// 元组 表示长度和个数（内容存放类型）都限制好了
let tuple: [string, number, boolean] = ['22', 2, true]
/*
    可以向元组添加内容，不能通过索引添加属性
    只能放入元组中已经声明过的类型
*/
tuple.push(0)

// 数组 存放一类类型的集合
let arr1: number[] = [2, 3, 4]
let arr2: string[] = ['2', '3', '4']
// 联合类型可以看着并集，既能使用数字 又能使用字符串
let arr3: (string | number)[] = ['2', 3, '4']
let arr4: Array<string | number> = ['2', 3, '4'] // 泛型方式声明
// any类型，不进行检测
let arr5: any[] = [2, '3', true, {}, [], 0]

// 枚举（默认可正向取出，也可反举，只能通过数字反举）
enum USER_ROLE {
    USER,   // 默认下标从0开始
    ADMIN,
    MANAGER
}
console.log(USER_ROLE.MANAGER);
console.log(USER_ROLE[1]);

// 异构枚举（可以通过数字自动向下推断）
enum USER_ROLE1 {
    USER = 'user',   // 默认下标从0开始
    ADMIN = 3, // 后面的值小标会从3开始++
    MANAGER
}
console.log(USER_ROLE1.USER);
console.log(USER_ROLE1[3]);
console.log(USER_ROLE1[4], '-=-=-');

// 常量枚举，只能字符串文本访问
const enum USER_ROLE2 {
    USER,
    ADMIN
}
console.log(USER_ROLE2.ADMIN) // 转换后直接为console.log(1)，减少代码

// null 和 undefined
// 任何类型的子类型，tscof在严格模式下，只能将null赋值给null，undefined赋值给ndefined
/*
    let str2:number | string;
    str2 = null  // 报错
    let u:undefined;
    u=null   // 报错
*/

// void 空类型 只能接受null 和 undefined，一般用于标识函数的返回值
let v: void;
// v=null  // tscof在严格模式下，不能将null赋给void
v = undefined // 不报错，因为函数默认的返回值就是undefined

/*
    never 类型，任何类型的子类型 可以把never赋给任何类型
    永远达不到的情况有三种
        1）错误 
        2）死循环 
        3）类型判断时
*/
function MyError(): never {
    throw new Error()
}

function whileTrue(): never {
    while (true) { }
}

// 当类型没有判断的条件时，val就是never类型
function byType(val: string | number) {
    if (typeof val == 'string') {
        val
    } else if (typeof val == 'number') {
        val
    } else {
        val // never
    }
}
let n = byType(1)

// Symbol（表示独一无二）
let s1 = Symbol('123')
let s2 = Symbol('123')
let obj = {
    [s1]: 456
}
// console.log(obj[s1]); // ts中symbol不能作为索引取值

// BigInt
const num1 = Number.MAX_SAFE_INTEGER + 1
const num2 = Number.MAX_SAFE_INTEGER + 2
console.log(num1==num2) // true

const big1 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)
const big2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2)
console.log(big1==big2) // false

// 对象类型 非原始数据类型 object
const create = (obj:object)=>[]
create({})
create([])
create(function(){})

let name = '222' // 默认全局下本就有name属性
// 加上export隔离此作用域,与全局作用域已隔离,name就不报错了
export {}


enum TEST_E {
    O='o',   
    S='s'
}

const a = {[o in TEST_E]:(()=>'string')}
