// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sleep(time: number | undefined) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
