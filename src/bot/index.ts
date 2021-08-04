import { Client, Message } from 'discord.js'
import { readFileSync } from 'fs';
import chalk from 'chalk';
import dotenv from 'dotenv'

import { IReply } from "./interface";
import { cmd } from '../r28'
import { title } from '../misc/console-helper';
import { token } from '../bootloader';
import { msgLog } from '../misc/logger';
import { CoreSend } from './command/core';

const splash = readFileSync('./assets/splash.txt')

export const client = new Client()
// 何故か無いとだめ
dotenv.config()

client.on('ready', () => {
  console.log(chalk.blueBright('boot done!'))
  console.log(`\x1b[38;2;115;139;201m${splash}\x1b[0m`)
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
const cSend = new CoreSend();
//const uSend = new UtilSend();

client.on("message", (message) => reply.messageReply(message));

client.on('message', (message) => cSend.ping(message));
client.on('message', (message) => cSend.status(message));

client.on('message', message => {
  if(cmd(message, 't1', false)) {
    message.channel.send(`<@${message.author.id}> <@499157410380906517>`);        
  }
});

client.on('message', message => {
  let content = message.content || "embed or file?"

  if (!(message.mentions.members) || message.mentions.members.each(function (member) {
    const user = client.users.cache.get(member.id)
    content = content.replace(`<@${member.id}>`, `@${user?.tag}`).replace(`<@${member.id}>`, `@${user?.tag}`)
  }))
    msgLog(`${title('user')}${message.author.tag} ${title('bot')}${message.author.bot} ${title('content')}${content}`, message)
});

export default function() {
  client.login(token)
}
