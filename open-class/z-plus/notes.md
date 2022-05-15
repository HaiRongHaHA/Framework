# pnpm搭建monorepo环境
使用pnpm安装包速度快，磁盘空间利用率高效，使用pnpm可以快速建立monorepo，so ~ 这里我们使用pnpm workspace来实现monorepo

使用pnpm必须要建立.npmrc文件，shamefully-hoist = true，否则安装的模块无法放置到node_modules目录下

pnpm-workspace.yaml配置文件

```
pnpm init

pnpm install -w // 安装全局包
-w --workspace-root

pnpm run --filter ./packages --parallel build
-F --filter
-r 所有子目录同时运行更新
--parallel 在所有匹配的包中立即运行给定的脚本

pnpm run -C packages/theme-chalk build

-C <path>, --dir <path>

将 <path> 设置为 pnpm 的运行目录，而不是当前目录。

pnpm:devPreinstall
仅在本地执行 pnpm install 时运行。

pnpm run start {name}

```

# 全局安装包，开发时各包可以互相引用

将我们的包创造个软链到根包下

```
pnpm install @z-plus/components @z-plus/theme-chalk @z-plus/utils -ws

pnpm install @z-plus/build-utils --wd
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
公有任务：导出的任务方法

私有任务：未被导出的，用series/parallel包裹执行的方法

gulp 默认执行default任务（gulpfile.ts中默认到处的就是default任务）

gulp --tasks  // 查看gulp公有/私有任务

--require

-f

- 串行  series
- 并行 parallel
- src() 读文件生成node流，src() 也可以放在管道（pipeline）的中间，以根据给定的 glob 向流（stream）中添加文件。新加入的文件只对后续的转换可用。如果 glob 匹配的文件与之前的有重复，仍然会再次添加文件。
- pipe() 连接装换流/可写流 pipeline管道 ，大多数情况下，利用 .pipe() 方法将插件放置在 src() 和 dest() 之间，并转换流中的文件。
- dest() 接收输出目录，产生一个node流，通常作为终止流

# npm包
## unbuild
统一的javascript构建系统，支持typescript并生成commonjs和module格式+类型声明。

Stub dist一旦使用jiti，您就可以尝试链接您的项目，而无需在开发过程中进行监视和重建。

Create src/index.ts and build.config.ts:

配置选项
https://github.com/unjs/unbuild/blob/HEAD/src/types.ts

## components-helper
VSCode + Volar 通过 ts 类型文件实现相关提示
VSCode + Vetur 通过 tags.json 和 attributes.json 实现相关提示
WebStorm 通过 web-types.json 实现相关提示
基于文档提供vue组件库的代码提示文件。

https://zhuanlan.zhihu.com/p/431382898

https://github.com/tolking/components-helper

## fast-glob
## 读取目标文件夹下的所有文件的状态stats，返回一个由文件的状态stats组成的数组

## esbuild
esbuild是最近比较火的编译工具，在有些领域已经开始替代webpack或babel，它的构建速度是 webpack 的几十倍。

https://juejin.cn/post/6918927987056312327

https://segmentfault.com/a/1190000040203331?utm_source=tag-newest

# package.json

peerDependencies

unpkg

jsdelivr

sideEffects

https://www.jqhtml.com/34046.html

# rollup

## 插件
- name 插件名
- resolveId ??

# 按需导入
不再用babel，使用unplugin-vue-components 和 unplugin-auto-import这两款插件做按需导入

https://github.com/antfu/unplugin-vue-components#installation

https://github.com/antfu/unplugin-auto-import#install

```
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```