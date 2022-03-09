/* 
    类型保护 具体到某个类型 （就是js中的类型判断）
    js关键字 typeof instanceof in
*/
// 1、typeof
function byType(val: string | number) {
    if (typeof val == 'string') {
        val
    } else {
        val
    }
}

// 2、instanceof
class Dog { }

class Cat { }

const getInstance = (clazz: new () => Dog | Cat) => new clazz

const dog = getInstance(Dog)
const cat = getInstance(Cat)

if (dog instanceof Dog) {
    dog
} else {
    dog
}

// 3、in
interface Fish {
    swiming: string
}

interface Bird {
    fly: string
}

function getType(animal: Fish | Bird) {
    if ('swiming' in animal) {
        animal
    } else {
        animal
    }
}

// ——————————————————————————————————————————
// ts特有 可辨识的类型
interface IButton1 {
    class: 'warning',
    click: Function
}
interface IButton2 {
    class: 'success',
    doubleClick: string
}
function getButton(val: IButton1 | IButton2) {
    if (val.class === 'warning') {
        val.click
    } else {
        val.doubleClick
    }
}

//  is  自定义类型
// xx is string
interface Fish2 {
    swiming: string
}
interface Bird2 {
    fly: string
}
function isFish(animal: Fish2 | Bird2): animal is Fish2 {   // 为了识别类型而已 ts语法
    return 'swiming' in animal
}
function getType2(animal: Fish2 | Bird2) {
    if (isFish(animal)) {
        animal
    } else {
        animal
    }
}

// null保护 !非空断言
function getNum(val?: number | null) {
    val = val || 10.1
    function a() {  // ts中无法检测内部函数变量，需要再次进行判断
        if (val != null) {
            val.toFixed
        }
    }
    a()
}

getNum()

// 对代码的完整性进行保护 反推代码 never
interface ICircle {
    kind: 'circle'
    r: number
}
interface IRant {
    kind: 'rant'
    width: number
    height: number
}
interface ISquare {
    kind: 'square'
    width: number
}

const assert = (obj: never) => { throw new Error('永远达不到') }  // 代码必须写完整

const getArea = (obj: ICircle | IRant | ISquare) => {
    switch (obj.kind) {
        case 'rant':
            return obj.width + obj.height
        case 'square':
            break
        case 'circle':
            break
        default:
            return assert(obj)  // 为了实现完整性保护
    }
}

getArea({ kind: 'rant', width: 100, height: 100 })
getArea({ kind: 'square', width: 100 })

export { }