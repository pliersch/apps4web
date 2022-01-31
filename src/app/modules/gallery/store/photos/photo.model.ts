export interface Photo {
  id: string;
  fileName: string;
  tags: string[];
  createDateTime: Date;
  baseUrl: string;
  isSelected: boolean;
}

// export function comparePhotos(p1: Photo, p2: Photo): number {
//   const creationTime1 = new Date(p1.createDateTime).getTime();
//   const creationTime2 = new Date(p2.createDateTime).getTime();
//   const compare = creationTime1 - creationTime2;
//   if (compare > 0) {
//     return 1;
//   } else if (compare < 0) {
//     return -1;
//   } else {
//     return 0;
//   }
// }
