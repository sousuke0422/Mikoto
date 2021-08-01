/**
 * r28api
 * 
 * rei0784 -> r + 0784/28 -> r28
 */
import { ENOTSUP } from "constants";
import { Message, Application } from "discord.js";
import { client } from "./bot";

import config from './config'
import { error } from "./misc/console-helper";
import { apiLog, cmdLog } from "./misc/logger";



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

export function apiGet(url: string) {
  const promise = new Promise<void>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      credentials: 'omit'
    }).then(async (res) => {
      const body = await res.json().catch(() => null)

      if (res.status === 200) {
        resolve(body)
        apiLog(`success GET "${url}"`)
      } else if (res.status === 204) {
        resolve()
      } else {
        reject(body ? body.error : `${res.status} ${res.statusText}`)
        apiLog(error(`failed GET (${res.status}) ${url}`), true)
      }
    })
  })
}

export function apiPost(url: string, data: Record<string, object> = {}) {
  return ENOTSUP
}
