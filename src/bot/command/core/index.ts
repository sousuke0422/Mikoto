import { Message } from "discord.js";
import prettyMilliseconds from 'pretty-ms'

import { client } from "../..";
import { cmd } from "../../../r28";
import { ICoreSend } from "../../interface";

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
}
