/*
    unknown 不知道的类型 
    unknown 是any的安全类型
*/

// unknown 类型 可以被任何类型赋值
let abc:unknown;
// unknown不能通过属性取值 不能调用方法
abc.name
abc='22'

let unknown: any;
unknown = { name: 'zf' };
// unknown.name    // 用any类型取属性就不会报错
// ! 是非空校验 unknown本身就是空的不能调


// 类型判断，没有传入类型时 默认会推导出unknown类型

// unknown 和其他类型的联合类型 都是unknown
type t = unknown | number
// unknown 和 其他类型做交叉 获得到的永远是其他类型 
type t1 = unknown & number;

// unknown never是unknown的子类型
type t2 = never extends unknown ? true : false

// unknowm 不能使用keyof ， 否则获取到的值是never
type t3 = keyof unknown;
export { }
