/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * r28api
 * 
 * rei0784 -> r + 0784/28 -> r28
 */
import { Message } from "discord.js";
import fetch from 'node-fetch';

import config from './config/index.js'
import { error } from "./misc/console-helper.js";
import { apiLog, cmdLog } from "./misc/logger.js";
import { mikotoEdgeCanaryUA } from "./misc/user-agent.js";



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
      method: 'GET'
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
    }).catch(reject)
  })
  return promise
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function apiPost(url: string, data: { [x: string]: any } = {} ) {
  const promise = new Promise<void>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent': mikotoEdgeCanaryUA,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      const body = await res.json().catch(() => null)

      if (res.status === 200) {
        apiLog(`success POST "${url}"`)
        resolve(body)
      } else if (res.status === 204) {
        resolve()
      } else {
        apiLog(error(`failed POST (${res.status}) ${url}`), true)
        reject(body ? body.error : `${res.status} ${res.statusText}`)
      }
    }).catch(reject)
  })
  return promise
}
