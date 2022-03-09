import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'

export default {
    input:'./src/index.js',
    output: {
        file:'dist/vue.js',
        name:'Vue',
        sourcemap: true,// es6->es5
        format:'umd'// 统一模块规范
    },
    plugins:[
        babel({
            exclude:'node_modules/**'
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''// 表以当前根目录
        })
    ]
}