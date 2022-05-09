import { spawn } from 'child_process'
import { projRoot } from './paths'
export const run = async (command: string) => {
    return new Promise((resolve) => {
        const [cmd, ...args] = command.split(' ');
        const app = spawn(cmd, args, {
            cwd: projRoot,
            stdio: 'inherit',
            shell: true
        });
        app.on('close', resolve)
    })
}