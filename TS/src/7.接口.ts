/*
    接口 描述对象的形状
    根据接口可以提供一些新的类型为别人使用
*/

// 1) 描述对象
// type XX = { firstName: string, lastName: string } // 这么做也能做到（不建议）
interface IFullName {
    firstName: string,
    lastName: string
}
const fullName = (obj: IFullName): string => {
    return obj.firstName + obj.lastName
}
console.log(fullName({ firstName: 'wang', lastName: 'hairong' }))

// 2) 描述函数
interface IFn {
    (obj: IFullName): string
}
const fullName2: IFn = ({ firstName, lastName }) => {
    return firstName + lastName
}
console.log(fullName2({ firstName: 'wang', lastName: 'rong' }))

// 3) 混合类型
interface ICount {
    (): number,
    count: number
}
const counter: ICount = () => {
    return ++counter.count
}
counter.count = 0

console.log(counter());

// 4) 对象接口
interface IVegetables {
    color: string
    taste: string
}

// 第一种解决方式：如果定义的指比接口的多可以采用类型断言 直接断言成对应接口
const tomato1: IVegetables = ({
    color: 'red',
    size: 10,
    taste: 'sour'
} as IVegetables)

// 第二种解决方式：多个同名接口会剑行合并
interface IVegetables {
    size: number
}
const tomato2: IVegetables = {
    color: 'red',
    size: 10,
    taste: 'sour'
}

// 第三种解决方式：接口可扩展
interface Itomato extends IVegetables {
    size: number
}

const tomato3: Itomato = {
    color: 'red',
    size: 10,
    taste: 'sour'
}


interface IVegetables2 {
    color: string
    taste: string
    [xx: string]: any    // 任意属性
    readonly size?: number  // 只读属性
    type?: string   // 支持可选
}

const tomato4: IVegetables2 = {
    color: 'red',
    taste: 'sour',
    type: '',
    1: 1,
    a: 2,
    size: 1,
    [Symbol(1)]: 2
}
// tomato4.size = 2 // 只读，不可改

// 如果接口中[xxx:index] 可索引接口
interface IArr {
    [key: number]: any
}

const arr: IArr = [1, {}, 'a', []]

console.log(arr[2]);

// ——————————————————————————————————————————————
// 接口可以被类来实现
interface Speakable {   // 接口中的内容是抽象的，没有具体的实现
    name: string | number,  // 联合类型
    speak(): void   // 描述类的原型方法，对于类来说此处void表示不关系方法的返回值
}

interface ChineseSpeakable {
    speakChinese(): void
}

// 类实现接口 implements
class Speak implements Speakable, ChineseSpeakable {
    speakChinese(): void {
        throw new Error("Method not implemented.")
    }
    name!: string
    speak(): string {
        throw new Error("Method not implemented.")
    }
}

let s = new Speak()

// 类 抽象类（不能被实例化）只有抽象类里面的属性和方法 才可以标记abstract 子类也必须实现
abstract class Animal { // 抽象类中可以包含抽象方法和抽象属性
    abstract name: string   // 抽象属性 不能具有实现
    abstract test(): void   // 抽象实现 不能具有实现
    eat() { // 不标识abstract的可以有实现
        console.log('eat');
    }
}

// 父类一般都不会被实例化（不想被实例化的可以实现一个抽象类）
class Tom extends Animal {
    test(): void {
        throw new Error("Method not implemented.")
    }
    name!: string   // 父类如果是抽象的，字类必须要实现
}

const tom = new Tom()
tom.eat()

// ------------------------------
// 接口可以描述对象、函数、类、类的实例

class Person {
    constructor(public name: string) {
        this.name = name
    }
}

// 泛型 就是当调用时传入具体类型 先用一个标识来占位 在调用时候决定类型是什么 <T>泛型
interface IClazz<T> {  // 标识构造函数类型
    new(name: string): T   // 可以用类当成类型
}

// new (name: string)=>any  // 与IClazz同义
function createInstance<T>(clazz: IClazz<T>, name: string) {
    return new clazz(name)
}

let r = createInstance<Person>(Person, '海容')


export { }