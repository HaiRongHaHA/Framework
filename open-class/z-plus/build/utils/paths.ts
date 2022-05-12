import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..')


/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/element-plus` */
export const epOutput = resolve(buildOutput, 'element-plus')