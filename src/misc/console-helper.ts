/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import chalk from "chalk";

/**
 * エラー
 * @param out 
 * @returns "E: ${out}"
 */
export function error(out: string) {
  return `${chalk.redBright('E')}: ${out}`
}

/**
 * タイトル
 * @param out 
 * @returns "${out}: "
 */
export function title(out: string) {
  return `${chalk.magenta(out)}: `
}
