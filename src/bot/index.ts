import {　Client, Message　} from 'discord.js'
import dotenv from 'dotenv'

import { IReply } from "./interface";
import config from '../config'
import { cmd } from '../r28'

export const client = new Client()
dotenv.config()
const token = process.env.BOT_TOKEN || config.core.token

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
