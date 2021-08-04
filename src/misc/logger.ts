// https://github.com/syuilo/ai/blob/09fc4291f05eaeb65049a4eea24b7d1e79f7c3ff/src/utils/log.ts

import chalk from 'chalk';
import { Message } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function logger(msg: string, error?: boolean) {
	const now = new Date();
	const date = `${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
	if (!error) {
    console.log(`${chalk.gray(date)} ${msg}`);
  } else {
    console.warn(`${chalk.gray(date)} ${msg}`);
  }
}

function zeroPad(num: number, length = 2): string {
	return ('0000000000' + num).slice(-length);
}

export function apiLog(msg: string, error?: boolean): void {
  logger(`[api]: ${msg}`, error);
}

export function cmdLog(msg: string, error?: boolean): void {
  logger(`[cmd]: ${msg}`, error);
}

export function msgLog(msg: string, data: Message): void {
  logger(`[msg | ${data.guild?.name} => #${data.guild?.channels.cache.get(data.channel.id)?.name}]: ${msg}`);
}
