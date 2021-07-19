import chalk from "chalk";

export function error(out: string) {
  return `${chalk.redBright('E')}: ${out}`
}

export function title(out: string) {
  return `${chalk.magenta(out)}: `
}
