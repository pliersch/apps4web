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

// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(x => arr2.includes(x));
}

// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(x => !arr2.includes(x));
}

// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
export function joinUnique<T>(arr1: T[], arr2: T[]): T[] {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x)));
}
