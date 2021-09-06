import { Client, ClientOptions, Intents, Message } from 'discord.js'
import { readFileSync } from 'fs';
import chalk from 'chalk';
import dotenv from 'dotenv'

import { IReply } from "./interface.js";
import { cmd } from '../r28.js'
import { title } from '../misc/console-helper.js';
import { token } from '../bootloader.js';
import { logSream, msgLog, sysLog } from '../misc/logger.js';
import { CoreSend } from './command/core/index.js';

const splash = readFileSync('./assets/splash.txt')

const options: ClientOptions = {
  intents: Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0),
};

/**
 * make client
 */
export const client = new Client(options)
// 何故か無いとだめ
dotenv.config()

client.on('ready', () => {
  console.log(chalk.blueBright('boot done!'))
  console.log(`\x1b[38;2;115;139;201m${splash}\x1b[0m`)
  console.log(`${title('user')}${client.user?.tag}`)
  console.debug(`${title('id')}${client.user?.id}`)
  sysLog("Hello World!!")
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

client.on('messageCreate', (message) => cSend.ping(message));
client.on('messageCreate', (message) => cSend.status(message));
client.on('messageCreate', (message) => cSend.shutdown(message));

client.on('messageCreate', message => {
  if(cmd(message, 't1', false)) {
    message.channel.send(`<@${message.author.id}> <@499157410380906517>`);        
  }
});

client.on('messageCreate', message => {
  let etc
  let text = message.content

  if (!(message.mentions.members) || message.mentions.members.each(function (member) {
    const user = client.users.cache.get(member.id)
    text = text.replace(`<@${member.id}>`, `@${user?.tag}`).replace(`<@${member.id}>`, `@${user?.tag}`)
  }))

  etc = `\n${title('embed')}${JSON.stringify(message.embeds, null, 2)}\n${title('file(s)')}${JSON.stringify(message.attachments, null, 2)}`

  const content = text || etc

  msgLog(`${title('user')}${message.author.tag} ${title('bot')}${message.author.bot} ${title('content')}${content}`, message)
});

// todo
//client.on('destroy', () => {
//  sysLog('Reconnecting...')
//  client.login(token)
//})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function() {
  client.login(token)
}

process.on("exit", function() {
  sysLog('Shutting down...')
  logSream.end()
  console.log("Close World")
})

process.on('SIGINT', function() {
  process.exit(0);
});
