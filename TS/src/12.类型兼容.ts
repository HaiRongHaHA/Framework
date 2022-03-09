// ts中的兼容性 一个类型能否被赋予给了一个类型

/* 1、基本数据类型的兼容性 */
let str!: string
let temp: string | number

// str = temp   // 报错 安全性考虑 不能将number赋给string

temp = str  // 从安全性考虑（可以把小类型赋予给更多类型）

/* 2、ts鸭子类型检测 结构（只要长得像就可以） */
interface MyNum {
    toString(): string
}
let str2: MyNum = 'xxx' // 我要的你有就可以了
let myNum!: MyNum // 我要的是有toString方法的
// let str4: string = myNum // 我要的你多了，从安全性考虑要报错

/* 3、接口类型兼容性 */
interface Animal {
    name: string,
    age: number
}
interface Person {
    name: string,
    age: number,
    address: string
}
let animal!: Animal;
let person!: Person;

animal = person; // // 我要的你有就可以了
// person = animal  // 报错 animal中没有person的address

/* 4、函数 */
// 函数的兼容性 函数参数要求：赋值的函数的参数要小于等于被赋值的函数
let sum1 = (a: string, b: string) => { }
let sum2 = (a: string) => { }

sum1 = sum2;  // forEach
// sum2 = sum1  // 报错 sum1的参数比sum2多

// 自己实现一个forEach
type ForEachFn<T> = (item: T, index: number) => void // 用户使用时可以只写一个参数

function forEach<T>(arr: T[], cb: ForEachFn<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i)
    }
}

forEach([1, 2, 3, 4], (item) => {
    item
})

// 函数的返回值（遵循基本类型的特性，遵循接口特性）
type sum1 = () => string | number
type sum2 = () => string

let s1!: sum1
let s2!: sum2

s1 = s2
// s2 = s1  // 报错


// 从安全考虑上考虑，不要死记一下规则
// 1.基本类型 可以小范围的赋予给大范围的
// 2.接口类型 可以把多的赋予给少的
// 3.函数的兼容性 (函数的参数 函数的返回值) 
//  1)函数的参数:可以把参数少的函数赋予给参数多的函数
//  2)函数的返回值遵循以上1,2,3点

/* 逆变 协变 双向协变 */
class Parent {
    address: string = '回龙观'
}
class Child extends Parent {
    money: number = 100;
}
class Grandson extends Child {
    name: string = 'Tom'
}
// 逆变 （函数的参数可以逆变 可以传递父类和自己） 
function getFn(cb: (person: Child) => Child) { }
getFn((person: Parent) => new Child);
getFn((person: Child) => new Child);
// getFn((person: Grandson) => new Child);  // 报错 把多的给了少的

// 协变（函数的返回值 可以传递子类和自己）
// getFn((person: Parent) => new Parent); // 报错 把少的赋给了多的
getFn((person: Parent) => new Grandson);

// 参数是双向协变 就是可以传儿子 也可以传父亲 （默认在严格模式下不支持）
// getFn((person:Grandson)=>new Grandson);  

/* 类的兼容性 两个类一样就兼容 */
class Person1 {
    // private name: string = 'zf'  // 这个类加了private proteced等属性便不能兼容了
    name: string = 'zf'
}

class Person2 {
    name: string = 'zf'
    age: number = 1
}
let p1!: Person1
let p2!: Person2 // 实例的特点 还是遵循正常的兼容性 , 比较的是实例长得什么样，跟接口的兼容性一样(你要的有就行)
p1 = p2;

/* 枚举类型永远不兼容 */
enum E1 { }
enum E2 { }
let e1!: E1
let e2!: E2
// e1 = e2; 
// e2 = e1; 

/* 泛型 根据最终结果来确定是否 兼容 （返回的结果一样就兼容） */
interface A<T> {
    [key: number]: T
}
interface B<T> {
    [key: number]: T
}

type A1 = A<string>
type B1 = B<number>
let a1!: A1;
let a2!: B1;

// 如果接口里是空，泛型并没有用，没有结果，就是兼容的
// a1 = a2
// a2 = a1

// 基本类型 
// 接口兼容性
// 函数的兼容性 参数（可以少的给多的） 返回值  逆变和协变 传父反子
// 类的兼容性 => 实例
// 枚举不兼容
// 泛型看最终结果是否兼容

/* 题外话——能使用接口就用接口，接口用不了就用typ，没有继承没有实现就直接用type */
interface a { }
interface b extends a { } // 继承这中用不了type

type e = string | number    // 这中接口实现不了

export { }