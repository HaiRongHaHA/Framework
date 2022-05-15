// 构建全局包
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import { PKG_BRAND_NAME } from '@z-plus/build-constants'
import { epOutput, epRoot } from '@z-plus/build-utils'
import { version } from '../../../../packages/z-plus/version'
import { ZPlusAlias } from '../plugins/z-plus-alias'
import {
  formatBundleFilename,
  generateExternal,
  withTaskName,
  writeBundles,
} from '../utils'
import { target } from '../build-info'

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify: boolean) {
  const bundle = await rollup({
    input: path.resolve(epRoot, 'index.ts'),
    plugins: [
      ZPlusAlias(),
      vue({
        isProduction: true,
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        exclude: [],
        minify,
        sourceMap: minify,
        target,
        loaders: {
          '.vue': 'ts',
        },
        define: { // ？？？
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
    ],
    external: await generateExternal({ full: true }),
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: 'ElementPlus',
      globals: {
        vue: 'Vue',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner,
    },
  ])
}
export const buildFull = (minify: boolean) => async () =>
  Promise.all([buildFullEntry(minify)])

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
)
