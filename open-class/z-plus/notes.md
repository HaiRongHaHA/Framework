# pnpm搭建monorepo环境
使用pnpm安装包速度快，磁盘空间利用率高效，使用pnpm可以快速建立monorepo，so ~ 这里我们使用pnpm workspace来实现monorepo

使用pnpm必须要建立.npmrc文件，shamefully-hoist = true，否则安装的模块无法放置到node_modules目录下

pnpm-workspace.yaml配置文件

```
pnpm init

pnpm install -w // 安装全局包

pnpm run --filter ./packages --parallel build

pnpm run -C packages/theme-chalk build

```

# 全局安装包，开发时各包可以互相引用

将我们的包创造个软链到根包下

```
pnpm install @z-plus/components @z-plus/theme-chalk @z-plus/utils -ws
```

```
  "dependencies": {
    "@z-plus/components": "workspace:^1.0.0", // 表示这个包引用的当前命名空间的1.0版本
    "@z-plus/theme-chalk": "workspace:^1.0.0",
    "@z-plus/utils": "workspace:^1.0.0"
  }
```

# 问啥不用learna？
learna 配置比较多，要跟yarn配合，pnpm更方便搭建monorepo

element-plus 第一版就是使用learna+yarn，后面推翻使用pnpm搭建了

# vue3
as const 表示此类型是只读的

ExtractPropTypes vue内置的一个类型，传入类型，它会返回一个props类型

setup 实验性

import type { App, Plugin } from "vue"; // import type只导入类型 而不是导入值

app.use 需要的是一个plugin类型

ts类型必须要导出，不然不会生出.d.ts

# 主题
@use 'config' as *; // *没有命名空间的，表示将config里的全部导入
@use 'config' as xx; // 以xx为命名空间使用，需要通过空间名使用xx.xx
@use 'config' // 直接导入（不需要使用的时候）
@forward 'config'; // 在任何文件中使用，变为全局变量

// 以前都是用@import引入，此方式有弊端
@import 多次引用会多次合并打包，@use不会，所以现在都用@use替换掉@impot

$namespace:'z' !default;

# 打包
webpack 适合写业务项目用

rollup 把多个小模块打包成一个大模块，整合所有的包，适合类库打包用

sucrase // 支持gulp做ts解析，不然会报错需要自己用babel
比如你可能会想以 TS 的方式编写 gulpfile.ts、但 gulp-cli 本身只支持 gulpfile.js，那就可以用它引入一个前置模块、把 ts 编译成 js 再执行。
再比如你可能会想使用 ES Module 作为模块化方案，但 Node.js 本身只支持 CommonJS，那么就可以用它来先做个转换。

gulp 控制打包流程的，还可以将css/js/html等代码进行转义输出

gulp打包分串行和并行

gulp 执行命令，默认找default 可以指定允许方法

import { spawn } from 'child_process'

node子进程

# gulp

// 串行  series

// 并行 parallel

