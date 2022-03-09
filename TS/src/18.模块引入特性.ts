// 类型声明 根据不同格式有不同声明
declare const vue: String   // declare  关键字 只是让我们的代码有提示功能而已
declare function sum(): void // declare  只有声明，没有实现
declare class Person { }
declare interface Tamoto {
    name: string
}

declare namespace A {
    const a: string // declare 里面的内容 不需要导出 也不需要在增加declare
}
declare module B {  // module和namespace随意用，都可以 这中写法是老语法，已经没啥人用了
    const b: string
}

declare enum Seansos {
    Spring,
    Summer
}
Seansos.Spring  // 编译的结果不会有这些声明文件代码 只是为了有提示

// --------------这些东西就是给你当提示用的 不需要实现-----------------

/*
    不是同名的就都能合并 
    接口同名的接口可以自动合并
    函数和命名空间能自动合并
    命名空间和 命名空间也能合并
*/

$('xxx').width(100);
$('xxx').height(2000);
$.fn.extend();

// "moduleResolution": "node" 找模块以node的方式找  
// npm install @types/jquery (如果本身模块用的就是ts编写的就不需要安装类型声明文件)
import $ from 'jquery'; // export default $

// import $  = require('jquery'); 
// jquery源码声明文件中 export = jquery (为了兼容commonjs 规范来实现) node中可以使用这套api
// export = Jquery ts 准备好的到处方法  表示代码可以在commonjs规范中使用

// commonjs 规范可以动态引入  es6 静态的 可以支持treeshaking 



export { }