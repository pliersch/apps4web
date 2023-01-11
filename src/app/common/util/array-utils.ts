export function difference<T>(keep: T[], remove: T[]): T[] {
  return remove.filter(x => !keep.includes(x));
}

export function difference2<T>(keep: T[], remove: T[]): T[] {
  return keep.filter(x => !remove.includes(x));
}

export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(x => arr2.includes(x));
}

export function joinUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
