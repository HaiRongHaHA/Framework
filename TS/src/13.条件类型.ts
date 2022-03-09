/* 
    条件类型 js三元表达式
    ts中很多的内置类型 HTMLElement node event....
*/

interface Bird {
    name1: string
    abv: number
}
interface Sky {
    sky: string
}
interface Fish {
    name2: string
}
interface Swiming {
    swim: string
}
/* 泛型约束 约束这个人是否满足他的特性 满足就为true 我要的你都有 */
type MyType<T> = T extends Bird ? Sky : Swiming; // 三元表达式（如果传的Bird就返回Sky不是就返回Swiming）
type x = MyType<Bird>
type y = MyType<Fish>
interface animal {
    name1: string
}
type v = MyType<animal>
//  条件的分发  Sky | Swiming 只有"联合"类型（交叉缩小范围）会进行分发操作，最终取联合类型
type z = MyType<Fish | Bird>

// 交叉类型
interface Person1 {
    handsome: string
}
interface Person2 {
    high: string
}
type Person3 = Person1 & Person2
let p1!: Person1;
let p2!: Person2;
let p3!: Person3;
p1 = p3
p2 = p3

/* 内置类型 (现在说的都是基于条件类型) */
// Exclude类型的排除（排除一样的）
/*  T extends U 分发
    string 比 boolean string
    number 比 boolean number
    boolean 比 boolean never
    相当于 string | number | never
    所以最后类型是 string | number
*/
type Exclude<T, U> = T extends U ? never : T;
type MyExclude = Exclude<string | number | boolean, boolean>;

// Extract 抽离类型(抽离出一样的)
type Extract<T, U> = T extends U ? T : never;
type MyExtract = Extract<string | number, boolean>
type MyExtract2 = Extract<string | number, number>

// 非null|undefind检测
type NonNullable<T> = T extends null | undefined ? never : T   // 将null和undefined排除
type MyNonNullable = NonNullable<string | number | null | boolean>


//  类型推导 infer
// 1、推断出函数返回值的类型 
function getUser(x: string, y: string) {
    return { name: 'zf', age: 11 }
}
// 不执行函数 取类型 infer(推断的意思) 写在哪里就推导哪里的类型
// infer X ? X : any 推断函数的返回值类型X(名字自定)了就是X否就随意指定一个类型
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer X ? X : any
type MyReturnType = ReturnType<typeof getUser>

// 2、推断出函数参数的类型
// 我传入的类型需要是一个函数 如果是函数 将参数类型推导出来塞入到变量P ? 返回P中 : 返回自定义类型
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
type MyParamsType = Parameters<typeof getUser>


// 2、取构造函数类型 参数类型
class Animal {
    constructor(name: string, age: number) { }
}
// 取构造函数参数类型
type ConstructorParameters<T extends { new(...args: any[]): any }> = T extends { new(...args: infer C): any } ? C : any
type MyConstructor = ConstructorParameters<typeof Animal>

// 取构造函数类型的实例类型
type InstanceType<T extends { new(...args: any[]): any }> = T extends { new(...args: any[]): infer R } ? R : any
type MyInstance = InstanceType<typeof Animal>


export { }