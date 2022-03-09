import ts from 'rollup-plugin-typescript2'// 解析ts的插件
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方模块
import serve from 'rollup-plugin-serve' // 启动本地服务
import path from 'path'

/*
    rollup支持es6语法
    天生tree-shaking
*/
export default {
    input: 'src/index.ts',
    output: {
        format: 'iife',//立即执行 自执行函数
        file: path.resolve('dist/bundle.js'),
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts']
        }),
        ts({
            tsconfig: path.resolve('tsconfig.json')
        }),
        serve({
            openPage: '/public/index.html',
            contentBase: '',
            port: 3000
        })
    ]
}