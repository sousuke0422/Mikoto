import { exit } from 'process'
import * as os from 'os'
import dotenv from 'dotenv'

import config from './config'
import bot from './bot'

//  const token = process.env.BOT_TOKEN || config.core.token || undefined
export default function () {
  dotenv.config()

  console.log('system check...')
  console.log(`os: ${process.platform}\narch: ${os.arch}`)
  if (process.env.BOT_TOKEN) {
    console.log('token mode: env')
  } else if (config.core.token) {
    console.log('token mode: config')
  } else {
    console.error('E: The token is not configured.')
    exit(1)
  }
  
  console.log('start bot...')
  return bot()
}
