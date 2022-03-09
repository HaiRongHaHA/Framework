/*
    泛型 特性 为了声明时不能确定类型 只有在使用时 才能决定类型
*/

/* 函数 */
function createArray<T>(times: number, val: T) {
    let res = []
    for (let i = 0; i < times; i++) {
        res.push(val)
    }
    return res
}
const r = createArray<string>(3, '4ryt')

// 泛型可以使用多个
function swap<T, K>(tuple: [T, K]): [K, T] {
    return [tuple[1], tuple[0]]
}
const s = swap<string, number>(['a', 3])

/* 接口 */
// 泛型写到函数上表示调用函数时传入具体类型
interface ISwap2 {
    <A, B>(tuple: [A, B]): [B, A]
}
const swap2: ISwap2 = (tuple) => {
    return [tuple[1], tuple[0]]
}
const s2 = swap2<boolean, number>([true, 3])

// 泛型写到接口后面表示使用接口时传入类型
interface ISwap3<A, B> {
    (tuple: [A, B]): [B, A]
}
const swap3: ISwap3<number[], number> = (tuple) => {
    return [tuple[1], tuple[0]]
}
const s3 = swap3([[1], 3])

// 函数参数接口使用时
interface ISwap4<A, B> {
    [key: number]: B
}
const swap4 = <A, B>(tuple: ISwap4<A, B>): ISwap4<A, B> => {
    return [tuple[0], tuple[1]]
}
const s4 = swap4([2, '4', true])
// const s5 = swap4<unknown, boolean>([2, '4', true])

/* 泛型约束 extends */
// 约束泛型的能力（当前类型具体哪种能力）
const sum = <T extends number>(a: T, b: T): T => {
    return (a + b) as T // 两个泛型不能相加 所以as一下
}

const r1 = sum(1, 2)

// 希望传入的数据 只要是带有length属性即可
interface WithLen2 {    // 与type WithLen同义
    length: number
}
type WithLen = { length: number }
function getType<T extends WithLen>(obj: T) {
    obj.length
}
getType('4345')
getType([])
getType({ length: 1 })

// 默认泛型 不传递 默认给予类型
interface IStr<T = string> {
    name: T
}
type T1 = IStr
type T2 = IStr<boolean>
type T3 = IStr<number>
const str: IStr = { name: '哈哈哈' }
const str2: T2 = { name: true }
const str3: T3 = { name: 5656 }

// 约束属性 
// keyof 表示取对象中的所有key属性
const getVal = <T extends Object, K extends keyof T>(obj: T, key: K) => { }
getVal({ a: 1, b: 2 }, 'b')
// getVal(undefined, 'b')  // 报错 undefined不是对象
// getVal({}, 'b') // 报错 b不是{}里的key

type t1 = keyof any; // 对象里只有number string symbol可以作为key

type t33 = keyof object;

// string | number（交集）类型中都可以作为key的toString | valueOf
type t2 = keyof (string | number);

/* 类 */
class MyArray<T>{
    public arr: T[] = []
    add(v: T) {
        this.arr.push(v)
    }
    getMax(): T {
        const arr = this.arr
        let max = arr[0]
        for (let i = 0; i < arr.length; i++) {
            const curr= arr[i]
            curr > max ? max = curr : void 0
        }
        return max
    }
}

const arr = new MyArray<number>()
arr.add(1)
arr.add(3)
arr.add(2)
console.log(arr.getMax());


export { }

