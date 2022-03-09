/*  内置类型（转化类型） */
interface Company {
    name: string,
    age: number,
    address: string,
    abc: {
        cc: string
    }
}
interface Person {
    name?: string,
    age: number,
    company: Company
}

type Partial<T> = { [K in keyof T]?: T[K] } // 将所有属性 变为可选属性
type MyPerson = Partial<Person>
const myPerson: MyPerson = {}

//                      取出类型中key 进行依次循环 ,如果值是对象 就递归当前值 再次转换成可选的
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] } // 深度可选
const myPerson2: DeepPartial<Person> = {
    company: {
        abc: {}
    }
}

// 必填属性 -? 把所有属性拿出来减去所有可选部分 (可选的值也都变成必填了)
type Required<T> = { [K in keyof T]-?: T[K] }
const myPerson3: Required<Person> = {}

// 只读属性 所有的属性都变成只读
type Readonly<T> = { readonly [K in keyof T]: T[K] }
let myPerson4: Readonly<Person> = {}

// Pick 从一个挑选出多个 之前学的抽离是从多个抽离出一个
type Pick<T, K extends keyof T> = { [X in K]: T[X] }
type PickPerson = Pick<Person, 'name' | 'age'>

/*
    Record记录  他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
    对象中的key 必须得是 string|number|symbol
    其实就是一个任意类型，只是能标识出 这个对象的返回值类型而已
*/
type Record<K extends keyof any, T> = {
    // [key:string]:any   
    // [key:number]:any
    [P in K]: T;
};
let obj: Record<string | number, number> = { name: 'zf', age: 11 }

/*
    map 方法
    name, age = T
    zf  11 = K
    u函数的返回值
*/
type Fn<K, T, U> = (item: K, key: T) => U
// 定义泛型                            对象参数            回调函数参数                  返回值类型
function map<K, T extends keyof any, U>(obj: Record<T, K>, cb: Fn<K, T, U>): Record<T, U> {
    let result = {} as Record<T, U>;
    for (let key in obj) {
        result[key] = cb(obj[key], key);
    }
    return result
}
let r = map({ name: 'zf', age: 11 }, (item, key) => {
    return 123
})

// Omit忽略属性  我希望有三个属性都是必填的，但是我希望把某个属性改成选填的
interface IPerson {
    name: string,
    age: number,
    company: Company
}
// type Omit<T,K extends keyof any> = Pick<T,Exclude<keyof T,K>>; // 排除company
type iperson = Omit<IPerson,'company'>;

// Exclude Extract Required Readonly Partial Omit Pick
// Record ReturnType instanceType ParamatersType....


export { }