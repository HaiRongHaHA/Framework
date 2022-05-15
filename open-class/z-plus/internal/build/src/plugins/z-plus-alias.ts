import { PKG_NAME, PKG_PREFIX } from '@z-plus/build-constants'

import type { Plugin } from 'rollup'

// 将组件里引入样式theme-chalk的路径替换成打包后的theme-chalk样式目录
export function ZPlusAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'z-plus-alias-plugin',
    resolveId(id) {
      // https://www.rollupjs.com/guide/plugin-development#resolveid
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute', // 保持绝对路径
        // If external is true, then absolute ids will be converted to relative ids based on the user's choice for the makeAbsoluteExternalsRelative option. This choice can be overridden by passing either external: "relative" to always convert an absolute id to a relative id or external: "absolute" to keep it as an absolute id. When returning an object, relative external ids, i.e. ids starting with ./ or ../, will not be internally converted to an absolute id and converted back to a relative id in the output, but are instead included in the output unchanged. If you want relative ids to be renormalised and deduplicated instead, return an absolute file system location as id and choose external: "relative".
      }
    }
  }
}