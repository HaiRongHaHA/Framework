// 第三方的 有其他人专门写了一些扩展方法

let person1 = {
    name: 'zf',
    age: 11,
    address: '回龙观'
}
let person2 = {
    address: '回龙观',
}

// 求差集
type Diff<T extends object, K extends object> = Omit<T, keyof K>
type MyDiff = Diff<typeof person1, typeof person2>;

// 求交集（数学意义上的）
type InterSection<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>
type myInter = InterSection<typeof person1, typeof person2>

// Overwrite 覆盖属性 如果存在了属性 用新的覆盖掉
interface Person11 {
    a: number,
    name: string,
    age: number
}
interface Person22 {
    age: string,
    address: string
}
/*
    address不会覆盖 但是age会覆盖掉原有的, 
    同样原来的还需要有 覆盖后是
    a: number
    name: string
    age: string
*/

/*  Overwrite实现解析
    Omit<T, keyof Diff<T, K>> 将1和2两个中不一样(Diff)[address]的给忽略(Omit)掉
    Pick<K, keyof Diff<K, T>> 将2和1两个中不一样(Diff)[a,name]的选取出来
    将上面两个结果相交 & [age: string, a: number, name: string]
*/
type Overwrite<T extends object, K extends object> = Omit<T, keyof Diff<T, K>> & Pick<K, keyof Diff<K, T>>
type myWrite = Overwrite<Person22, Person11>
let myType: myWrite = {
    a: 1,
    name: 'string',
    age: 'string'
}

// merge对象合并 
let t1 = { name: 'zf', a: 1, age: 'string' };
let t2 = { age: 11, a: 'string' };

type t1 = typeof t1;
type t2 = typeof t2

type Compute<T> = { [K in keyof T]: T[K] }; // 循环里面的属性 重新赋值
type Merge<T, K> = Omit<T, keyof K> & K
// type t3 = Merge<t1, t2> // 看不出类型 包了Compute能看出来类型
type t3 = Compute<Merge<t1, t2>>
/*
    合并后标识类型为
    type t3 = {
        name: string;
        age: number;
        a: string;
    }
*/
let ttt: t3 = {
    name: 'zf',
    a: 'xxx',
    age: 11
}

/*
    同学的问题
    有一个组件它接口 age 、name 、company 三个属性，
    都是可选的，但是如果传入了 name 那就必须要传入 age
*/
interface Test1 {
    age?: string,
    name?: string,
    company?: string
}
interface Test2 {
    age: string,
    name: string,
    company?: string
}
type NewType<T> = T extends { name: string } ? Test2 : Test1;

function getFn<T>(v: NewType<T>) {
}
let person = {}
getFn<typeof person>(person);

export { }