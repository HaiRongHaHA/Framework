import path from "path"
import { series, parallel } from "gulp"
import { copyFile, mkdir } from "fs/promises"
import { buildOutput, epOutput, epPackage, projRoot } from "@z-plus/build-utils"
import { run, withTaskName, runTask } from "./src"


export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(epOutput, 'global.d.ts')
    ),
  ])

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, "dist"), { recursive: true })
  await copyFile(
    path.resolve(epOutput, "theme-chalk/index.css"),
    path.resolve(epOutput, "dist/index.css")
  )
}

export default series(
  withTaskName("clean", () => run("pnpm run clean")),
  withTaskName("createOutput", () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask("buildModules"),
    runTask("buildFullBundle"),
    series(
      withTaskName("buildThemeChalk", () =>
        run("pnpm run -C packages/theme-chalk build")
      ),
      copyFullStyle
    )
  ),

  parallel(copyFiles)
)

// 导出src所有方法供gulp调用其他task
export * from "./src"
