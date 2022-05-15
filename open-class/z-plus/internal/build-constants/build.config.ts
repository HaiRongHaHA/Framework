import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true, // 压缩
  declaration: true, // 输出.d.ts
  rollup: {
    emitCJS: true, // 输出.cjs
  },
})
