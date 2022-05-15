import { spawn } from "child_process"
import chalk from "chalk"
import consola from "consola"
import { projRoot } from "@z-plus/build-utils"

export const run = async (command: string, cwd: string = projRoot) => {
  return new Promise<void>((resolve, reject) => {

    const [cmd, ...args] = command.split(" ")

    consola.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`)

    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === 'win32', // 兼容win系统差异
    })

    const onProcessExit = () => app.kill("SIGHUP") // 主进程退出时相应终止子进程

    app.on("close", (code) => {
      process.removeListener("exit", onProcessExit)

      // 进程成功退出
      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })

    process.on("exit", onProcessExit)
  })
}
