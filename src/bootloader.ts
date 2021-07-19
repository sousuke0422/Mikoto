import { exit } from 'process'
import * as os from 'os'
import chalk from 'chalk';
import dotenv from 'dotenv'

import { error, title } from './misc/console-helper';
import config from './config'
import bot from './bot'

//  const token = process.env.BOT_TOKEN || config.core.token || undefined
export default function () {
  dotenv.config()

  console.log(chalk.blueBright('system check...'))
  console.log(`${title('os')}${process.platform}\n${title('arch')}${os.arch}`)
  if (process.env.BOT_TOKEN) {
    console.log(`${title('token mode')}${chalk.green('env')}`)
  } else if (config.core.token) {
    console.log(`${title('token mode')}${chalk.green('config')}`)
  } else {
    console.error(error('The token is not configured.'))
    exit(1)
  }

  console.log(chalk.blueBright('start bot...'))
  return bot()
}
