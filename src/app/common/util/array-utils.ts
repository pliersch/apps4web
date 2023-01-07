export function difference<T>(keep: T[], remove: T[]): T[] {
  return remove.filter(x => !keep.includes(x));
}

export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(x => arr2.includes(x));
}

export function joinUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}

// function sameElements<T>(array1: T[], array2: T[]): boolean {
//   return JSON.stringify(array1) === JSON.stringify(array2);
// }

// export function sameElements<T>(array1: T[], array2: T[]): boolean {
//   return array1.length === array2.length && array1.every((element) => {
//     if (array2.indexOf(element) > -1) {
//       // TODO überarbeiten
//       return element = array2[array2.indexOf(element)];
//     }
//   });
// }

