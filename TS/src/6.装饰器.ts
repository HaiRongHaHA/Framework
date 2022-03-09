// 装饰器（只能装饰类，不能装饰函数，需要写到类的上面，否则可能会提升）

function aaa(target: Function) {   // 修饰类本身当前参数就是类
    console.log(2);

}
function modifier(target: Function) {   // 修饰类本身当前参数就是类
    console.log(1);
    target.prototype.say = function () {
        console.log('say',this.name);
    }
}


function toUpperCase(target: any, key: string) {
    let value = ''


    setTimeout(() => {
        // target指原型
        console.log(target == Person.prototype, 'target');
    }, 500)

    Object.defineProperty(target, key, {
        get() {
            return value.toUpperCase()
        },
        set(newVal) {   // 修饰静态属性时不会走set方法
            value = newVal
        }
    })
}

function double(num: number) {
    return (target: any, key: string) => {
        let value = target[key]
        Object.defineProperty(target, key, {
            get() {
                return value * num
            }
        })
    }
}


function Enum(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = false
}

function params(target: any, key: string, index: number) {
    console.log(target, key, index);

}

@aaa
@modifier

class Person {
    say!: Function
    @toUpperCase
    name: string = 'hairong'
    @double(3)
    static age: number = 10

    @Enum
    getName(aa: number, @params xx: string) {

    }
}

modifier(Person)
let person = new Person()

person.say()

console.log(person.name);
console.log(Person.age);
console.log(person.getName);

export { }