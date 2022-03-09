// 交叉类型 = 交集
// 一群比较高的人 和 一群比较帅的人  => 一群又高又帅的人

interface Person1 {
    handsome: string
}
interface Person2 {
    high: string
}
type Person3 = Person1 & Person2;
let person: Person3 = { // 交叉的部分
    handsome: '帅',
    high: '高'
}
interface Person4 {
    name: string
}
interface Person5 {
    name: number,
}
type Person6 = Person4 & Person5;   // 既是string又是number，不可能 所以是never
function fn(): never {  
    throw new Error("");
}
let person6: Person6 = { name: fn() };  // fn()【值】的类型是naver

// 混合结果
// extends object 防止T或者K不是一个对象
function mixin<T extends object, K extends object>(obj1: T, obj2: K) :T & K {
    return { ...obj1, ...obj2 }
}
let r = mixin({ a: 1 }, { b: 2 });

//  ts的类型 是为了安全起见 类型兼容性

export { }