//  联合类型（并集），当没有初始化时，只能调用两者类型中的共同方法
let str: string | number
// 赋值后会根据赋值，来推导后续的方法
str = 1
str.toFixed()

str = 'aaa'
str.trim()

// 元素不一定有值，所以是 HTMLElement | null(内置类型) 并集
let ele: HTMLElement | null = document.getElementById('#app')

ele?.style // ?.——es2020语法，可取值，不可赋值。 等价于 ele && ele.style
ele!.style.color = 'red';    // !.——非空断言 表示一定有值 ts语法

// 类型断言操作
(ele as HTMLElement).style.color = 'red'; // 不能断言不存在的属性
(<HTMLElement>ele).style.color = 'red'; // 表示强转类型，不推荐（与jsx有冲突）

// ele as boolean // 报错的
// 双重断言（不建议使用 会破坏原有类型）
(ele as any) as boolean

// 字面量类型（自定义类型）
type Diraction = 'up' | 'down' | 'left' | 'right' // 类型别名
let diraction: Diraction
// diraction = 'xx' // 报错，只能为指定的字面量
diraction = 'up'

export { }