import {　Client, Message　} from 'discord.js'
import chalk from 'chalk';
import dotenv from 'dotenv'

import { IReply } from "./interface";
import config from '../config'
import { cmd } from '../r28'
import { title } from '../misc/console-helper';

export const client = new Client()
dotenv.config()
const token = process.env.BOT_TOKEN || config.core.token

client.on('ready', () => {
  console.log(chalk.blueBright('boot done!'))
  console.log(`${title('user')}${client.user?.tag}`)
  console.debug(`${title('id')}${client.user?.id}`)
})

class Reply implements IReply {
  public async messageReply(message: Message): Promise<void> {
    if (cmd(message, 'sss', false)) {
      await message.reply("yee")
    }
  }
}

const reply = new Reply();
client.on("message", (message) => reply.messageReply(message));

export default function() {
  client.login(token)
}
