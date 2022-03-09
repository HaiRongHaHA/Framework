/*
    类（指es6的类）
    静态属性——类调用的
    实例属性——实例私有的
    原型属性——共享的
*/

class Pointer {
    // x: number = 1 // 默认值
    // x!: number  // 强制表示实例上有此属性
    // y!: number
    /*
        constructor(x: number, y: number) {
            this.x = x
            this.y = y
        }
    */
    /*
        constructor(x: number, y?: number) {
            this.x = x
            this.y = y as number // 这中方式可以解决报错问题，但这中错误出现说明代码有问题
        }
    */
    public x!: number
    public y!: number
    constructor(x: number, y: number, ...agrs: number[]) {
        this.x = x
        this.y = y
    }
    static abc = 1; // Pointer.abc
}

let pointer = new Pointer(1, 2, 3, 4, 5)

/*
    as 断言成xxx
    ! 非空断言
    ? 链判断运算符 有值取值 没值返回undefined
*/

/*
    类的修饰符
    public      都能访问到
    private     只有自己类可以访问到
    protected   父类字类中能访问，外部访问不到
    readonly    表示初始化后不能修改

    如果constructor被标识成了protected 则此类不能被new
    被标识成private 不能被继承
*/

class Animal {
    public name: string
    public age: number
    private readonly abc!: any
    protected constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    say() {
        console.log('Animal say');
        // this.abc = 111   // 只读属性不能更改（构造函数中可以赋值）
    }
    // 静态属性和静态方法
    static type = '动物'
    static getName() {
        return '获取动物名字'
    }
}

class Dog extends Animal {
    public address = ''
    constructor(name: string, age: number, address: string) {
        super(name, age)
        this.address = address
    }
    static getName() { // 子类重写父类方法
        console.log(super.getName()) // 静态方法中的super指代的是父类
        return '获取狗名字'
    }
    say() {
        super.say()
        return 'Dog say'
    }
    private _eat = '吃'
    // 属性访问器(公共属性定义在原型上)
    get eat() {
        return this._eat
    }
    set eat(val) {
        this._eat = val
    }
}

let animal = new Dog('狗', 1, '北京市')
// animal.type  // 实例上不能访问类的静态属性和方法
Animal.getName
Dog.type //  静态属性和方法可以被继承
console.log(Dog.getName())
console.log(animal.say())

console.log(animal.eat);
animal.eat = 'hello'
console.log(animal.eat);

export { }