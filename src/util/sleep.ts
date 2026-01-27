export const sleep = (msec: number = 0) =>
  new Promise<void>((resolve) => setTimeout(resolve, msec));

export const skipFrame = () =>
  Promise.race([new Promise(requestAnimationFrame), sleep(20)]);

export const skipFrames = async (times: number) => {
  for (let i = 0; i < times; i++) await skipFrame();
};
