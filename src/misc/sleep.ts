/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * sleep
 * @param time number | undefined
 * @returns wait
 */
export function sleep(time: number | undefined) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
