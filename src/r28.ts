/**
 * r28api
 * 
 * rei0784 -> r + 0784/28 -> r28
 */
import { ENOTSUP } from "constants";
import { Message, Application } from "discord.js";
import { client } from "./bot";

import config from './config'
import logger from "./misc/logger";

function cmdLog(msg: string, error?: boolean): void {
  logger(`[cmd]: ${msg}`, error);
}

/**
 * @param msg Communicate the event (Message)
 * @param command String to be used as command (string)
 * @param bot Allow bot no/yes (boolean)
 * @param prefix Use prefix yes/no (boolean)
 */
export function cmd(msg: Message, command: string, bot?: boolean, prefix?: boolean) {
  let func: string

  if (prefix == null) prefix = true
  if (bot == null) bot = false

  if (prefix) {
    func = config.core.prefix + command
  } else {
    func = command
  }

  if (msg.author.bot && !bot) {
    if (msg.content.startsWith(func) && prefix || msg.content === func) {
      cmdLog(msg.author.username + ` is bot. (command: "${msg.content}")`)
    }
    return false
  } else if (msg.content.startsWith(func) && prefix || msg.content === func) {
    cmdLog(msg.author.username + `: "${msg.content}"`)
    return true
  }
}

export function apiGet() {
  return ENOTSUP
}

export function apiPost() {
  return ENOTSUP
}
