import { resolve } from 'path'

/** `[root-path]` */
export const projRoot = resolve(__dirname, '..', '..', '..')

/** `[root-path]/packages` */
export const pkgRoot = resolve(projRoot, 'packages')

/** `[root-path]/packages/z-plus` */ 
export const epRoot = resolve(pkgRoot, 'z-plus')

/** `[root-path]/internal/build` */
export const buildRoot = resolve(projRoot, 'internal', 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')

/** `/dist/z-plus` */
export const epOutput = resolve(buildOutput, 'z-plus')

/** `[root-path]/packages/z-plus/package.json` */
export const epPackage = resolve(epRoot, 'package.json')