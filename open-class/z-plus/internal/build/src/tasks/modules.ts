// 构建单独模块包
import { epRoot, excludeFiles, pkgRoot } from "@z-plus/build-utils"
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue' // 打包vue文件插件
import vueJsx from '@vitejs/plugin-vue-jsx' // 支持vueJsx语法
// import DefineOptions from 'unplugin-vue-define-options/rollup' // 支持<script setup>语法糖
import { nodeResolve } from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import commonjs from '@rollup/plugin-commonjs' // 用于将 CommonJS 模块转换为 ES6
import esbuild from 'rollup-plugin-esbuild' // js/ts快速编译器
import glob from 'fast-glob' // 读取目标目录下所有文件
import { generateExternal, writeBundles } from '../utils'
import { ZPlusAlias } from '../plugins/z-plus-alias'
import { buildConfigEntries, target } from '../build-info'
import type { OutputOptions } from 'rollup'
// pnpm add rollup rollup-plugin-esbuild @rollup/plugin-commonjs @rollup/plugin-node-resolve @vitejs/plugin-vue @vitejs/plugin-vue-jsx

export const buildModules = async () => {
  // 排除'node_modules', 'test', 'mock', 'gulpfile', 'dist'，只要功能代码文件
  const input = excludeFiles(
    // 返回packages下所有js/ts/vue文件array
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true, // 不返回文件，排除文件夹
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      ZPlusAlias(),
      // DefineOptions(),
      vue({ // vue
        isProduction: false, // ???会做什么
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    // 排除某些文件不打包
    external: await generateExternal({ full: false }),
    treeshake: false, // 为啥不shake？
  })

  // 拿到bundle打包编译后的结果，和所有打包类型buildConfigEntries及条件
  // 循环打包类型数组，手动调用bundle.write将打包结果写入dist
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      // 配置文章解释
      // https://blog.csdn.net/zw52yany/article/details/122246174
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined, // 导出模式
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: epRoot, // 将保留的模块放在根级别的此路径下 `[root-path]/packages/z-plus`
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}