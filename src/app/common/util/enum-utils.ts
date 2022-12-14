export function getValuesOfEnum(e: Enum): string[] {
  const length2 = Object.keys(e).length / 2;
  const result: string[] = [];
  for (let i = 0; i < length2; i++) {
    result.push(e[i]);
  }
  return result;
}

interface Enum {
  [s: number]: string
}
