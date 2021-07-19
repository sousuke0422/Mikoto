// https://github.com/syuilo/ai/blob/09fc4291f05eaeb65049a4eea24b7d1e79f7c3ff/src/utils/log.ts

import chalk from 'chalk';

export default function(msg: string, error?: boolean) {
	const now = new Date();
	const date = `${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
	if (!error) {
    console.log(`${chalk.gray(date)} ${msg}`);
  } else {
    console.warn(`${chalk.gray(date)} ${msg}`);
  }
}

function zeroPad(num: number, length: number = 2): string {
	return ('0000000000' + num).slice(-length);
}
