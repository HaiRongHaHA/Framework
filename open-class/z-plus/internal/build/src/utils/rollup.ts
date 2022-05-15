import { epPackage, getPackageDependencies } from "@z-plus/build-utils"

import type { OutputOptions, RollupBuild } from "rollup"

// 组件里有用z-plus里依赖的包则排除，不参加打包
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  return (id: string) => {
    const packages: string[] = peerDependencies
    
    // 如果是单组件打包到，使用到的@vue依赖包也排除，不参与打包
    if (!options.full) {
      packages.push("@vue", ...dependencies)
    }
    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

// 调用RollupBuild的write，打包到最终目录
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

// 格式化打包文件名
export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? ".min" : ""}.${ext}`
}
