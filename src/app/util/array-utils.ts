// function sameElements<T>(array1: T[], array2: T[]): boolean {
//   return JSON.stringify(array1) === JSON.stringify(array2);
// }

function sameElements<T>(array1: T[], array2: T[]): boolean {
  // @ts-ignore // TODO überarbeiten
  return array1.length === array2.length && array1.every((element) => {
    if (array2.indexOf(element) > -1) {
      // TODO überarbeiten
      return element = array2[array2.indexOf(element)];
    }
  });
}

export const arrayUtil = {
  sameElements
};
