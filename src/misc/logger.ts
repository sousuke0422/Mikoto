// https://github.com/syuilo/ai/blob/09fc4291f05eaeb65049a4eea24b7d1e79f7c3ff/src/utils/log.ts

import chalk from 'chalk';
import { Message } from 'discord.js';
import { createWriteStream } from 'fs';

const setFileName = (timestamp: number) => {
  const date = new Date(timestamp);
  const yyyy = `${date.getFullYear()}`;
  // .slice(-2)で文字列中の末尾の2文字を取得する
  // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
  const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
  const dd = `0${date.getDate()}`.slice(-2);
  const HH = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);

  return `${yyyy}-${MM}-${dd}-${HH}${mm}`;
}

export const logSream = createWriteStream(`logs/${setFileName(Date.now())}.log`);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function logger(msg: string, error?: boolean) {
	const now = new Date();
	const date = `${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
	if (!error) {
    console.log(`${chalk.gray(date)} ${msg}`);
    // eslint-disable-next-line no-control-regex
    logSream.write(`${date} [info] ${msg.replace(/\[(.*?)m/g, '')}\n`)
  } else {
    console.warn(`${chalk.gray(date)} ${msg}`);
    // eslint-disable-next-line no-control-regex
    logSream.write(`${date} [warn] ${msg.replace(/\[(.*?)m/g, '')}\n`)
  }
}

function zeroPad(num: number, length = 2): string {
	return ('0000000000' + num).slice(-length);
}

export function sysLog(msg: string, error?: boolean): void {
  logger(`[system]: ${msg}`, error);
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
