import { Message } from "discord.js";

export interface IReply {
  messageReply(message: Message): Promise<void>;
}

export interface ICoreSend {
  ping(message: Message): Promise<void>;
  status(message: Message): Promise<void>;
  shutdown(message: Message): Promise<void>;
}
