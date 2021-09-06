import { Message } from "discord.js";
import prettyMilliseconds from 'pretty-ms'

import { client } from "../..";
import config from "../../../config";
import { cmd } from "../../../r28";
import { ICoreSend } from "../../interface";

const ownerId = config.core.ownerId || "000000000000000000"

export class CoreSend implements ICoreSend {
  public async ping(message: Message): Promise<void> {
    if(cmd(message, 'ping', false)) {
      message.channel.send(new Date().getTime() - message.createdTimestamp + " ms\n" + `API Latency is ${Math.round(client.ws.ping)}ms`);        
    }
  }

  public async status(message: Message): Promise<void> {
    if(cmd(message, 'status', false)) {
      message.channel.send(`uptime: ${prettyMilliseconds(client.uptime || 0)}`);
    }
  }

  /**
   * shutdown command
   * @param message Message
   */
  public async shutdown(message: Message): Promise<void> {
    if(cmd(message, 'shutdown', false)) {
      //message.channel.send('waite...');
      if (message.author.id === ownerId) {
        await message.channel.send('ok');
        process.exit(0)
      } else {
        message.channel.send('shutdown: Permission denied');
      }
    }
  }
}
