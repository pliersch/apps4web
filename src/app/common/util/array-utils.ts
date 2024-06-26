/**
 * compare([1,2,3], [2,3]) return [1]
 * doesn't support objects
 */
export function difference<T>(keep: T[], remove: T[]): T[] {
  return keep.filter(x => !remove.includes(x));
}

/**
 * compare([1,2,3], [2,3,4]) return [2,3]
 * doesn't support objects
 */
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(x => arr2.includes(x));
}

/**
 * example: compare([1,2,3], [2,3,4]) return [1,2,3,4]
 * doesn't support objects
 */
export function joinUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
