import { Message } from "discord.js";

export interface IReply {
  messageReply(message: Message): Promise<void>;
}
