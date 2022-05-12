import { series, parallel } from "gulp"
import { run, withTaskName } from "./utils"

export default series(
  withTaskName("clean", () => run("rm -rf ./dist")),
  parallel(
    withTaskName("buildThemeChalk", () =>
      run("pnpm run -C packages/theme-chalk build")
    )
  )
)
