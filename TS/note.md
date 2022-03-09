### 1.全局编译TS文件

```
npm install typescript -g
tsc --init # 生成tsconfig.json
```

```
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

### 2.配置webpack环境

```
// 安装依赖

npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

```
// 初始化TS配置文件

npx tsc --init

```

```
// 配置操作 rollup.config.js

import ts from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'
export default {
    input:'src/index.ts',
    output:{
        format:'iife',
        file:path.resolve('dist/bundle.js'), 
        sourcemap:true
    },
    plugins:[
        nodeResolve({
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        })
    ]
}
```

```
// package.json配置

"scripts": {
      "dev": "rollup -c -w"
}
```