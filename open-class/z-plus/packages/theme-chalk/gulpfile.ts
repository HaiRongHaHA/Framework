import path from "path"
import chalk from "chalk"
import { dest, parallel, series, src } from "gulp"
import gulpSass from "gulp-sass" // 处理sass
import dartSass from "sass"
import autoprefixer from "gulp-autoprefixer" // 添加前缀
import cleanCSS from "gulp-clean-css" // 压缩css
import rename from "gulp-rename" // 重命名
import consola from "consola"
import { epOutput } from "@z-plus/build-utils"

const distFolder = path.resolve(__dirname, "dist")
const distBundle = path.resolve(epOutput, "theme-chalk")

/**
 * 编译scss文件并压缩
 */
function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, "src/*.scss"))
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false, //是否美化属性值
      })
    )
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        )
      })
    )
    .pipe(
      // 重命名css文件名，都加上el-前缀，
      // 排除 index.scss[全部样式] base.scss[基础样式] display.scss[媒体查询]
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `z-${path.basename}`
        }
      })
    )
    // 输出dist目录到当前包
    .pipe(dest(distFolder))
}

/**
 * Build dark Css Vars
 * @returns
 */
function buildDarkCssVars() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, "src/dark/css-vars.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        )
      })
    )
    .pipe(dest(`${distFolder}/dark`))
}

/**
 * 从当前包目录将dist目录拷贝到 根dist/z-plus/下
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * 拷贝源码到项目根dist目录
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, "src/**")).pipe(
    dest(path.resolve(distBundle, "src"))
  )
}
export const build = parallel(
  copyThemeChalkSource,
  // buildDarkCssVars,
  series(buildThemeChalk, copyThemeChalkBundle)
)

export default build
