/*
    函数表示类型:
        1) 函数关键字方式
        2) 表达式方式
    考虑函数入参出参

*/

/*
    1)  声明不赋值就是any类型
    不想写类型any报错，可以把noImplicitAny改成false（不推荐）
    
    function sum(a, b) {
        return a + b
    }

    function sum(a: string, b: string): string {
        return a + b
    }
*/

// 把一个可以兼容的函数赋予给它
type Sum = (a: string, b: string) => string // 用不了interface 就用type(声明类型)
let sum: Sum = (a: string, b: string): string => { return a + b }

// 函数部分定义了类型，sum1会推导为函数返回的类型（一般用这种）
let sum1 = (a: string, b: string): string => { return a + b }

// 前面定义了类型，函数部分会推导为sum2定义的类型
let sum2: (a: string, b: string) => string = (a, b) => { return a + b }

// 可选参数?
let sum3 = (a: string, b?: string) => { }

// 默认值=
let sum4 = (a: string, b: string = 'b') => { }

// 剩余参数
let sum5 = (...args: (number | string)[]) => { }
sum5(1, '2', 4, 5)

// 函数重载(类型)
/*
    希望把一个字符串或数字转换成一个数组
    123=>[1,2,3]
    '123'=>['1','2','3']
*/

function toArray(value: number): number[]
function toArray(value: string): string[]
function toArray(value: number | string) {
    if (typeof value === 'string') {
        return value.split('')
    } else {
        return value.toString().split('').map(v => parseInt(v))
    }
}

console.log(toArray(124))
console.log(toArray('124'))

export { }