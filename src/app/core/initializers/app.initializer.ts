export function initApplication(): () => Promise<unknown> {
  return () => new Promise(resolve => {
    resolve(true);
  });
}

