/*
    类型推断
    1、当赋值时会推断
    2、函数默认会进行推断
    3、返回值的推断
    4、属性推断
*/

// 1、当赋值时会推断
// 不赋值是any类型，赋值后根据值进行推断
let str = ''
let age = 11

// 2、函数默认会进行推断
// 函数会根据左边的赋值 推导右边的类型

// 写全，不推断时
/*
const sum: (a: string, b: string) => string = (a: string, b: string): string => {
    return a + b
}
*/
// 推断后
const sum = (a: string, b: string): string => {
    return a + b
}

// 3、返回值的推断
// 返回值不写根据返回值自动推断类型
const sum2 = (a: string, b: string) => {
    return a + b
}

// 4、属性推断
const school = {    // 需要限制必须要加添加类型 不限制可以自动推断
    name: 'aaa',
    age1: 21,
    address: {
        n: [],
        a: {
            b: {}
        }
    }
}
// 对象解构，自动推断类型 由右边推导左边
const { name, age1 } = school

interface ISchool { // 通过索引访问操作符获取类型
    name: string,
    age1: number,
    address: {
        n: boolean
    }
}

type m = ISchool['name']    // 接口中取属性 只能用方括号[]
type n = ISchool['address']['n']

/* 类型反推  eextends keyof typeof*/

type MySchool = typeof school
type MySchool2 = keyof ISchool


export { }