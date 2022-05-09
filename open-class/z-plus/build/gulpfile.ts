import { series, parallel } from 'gulp'

export default series(
 async () => {
   console.log('打包');
 }
)