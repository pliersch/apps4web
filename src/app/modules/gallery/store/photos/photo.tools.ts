import {Photo} from "@gallery/store/photos/photo.model";

// export function filterSomeTags(photos: Photo[], tags: string[]): Photo[] {
//   let result = [];
//   for (const photo of photos) {
//     if (photo.tags.some(tag => tags.includes(tag))) {
//       result.push(photo);
//     }
//   }
//   return result;
// }

const API_URL: string = 'http://localhost:3000/images/gallery/';

export function filterAllTags(photos: Photo[], tags: string[]): Photo[] {
  let result = [];
  for (const photo of photos) {
    let some = tags.every(r => photo.tags.includes(r));
    if (some) {
      result.push(photo);
    }
  }
  return result;
}

export function getPhotoUrl(fileName: string): string {
  return API_URL + 'full/' + fileName + '.jpg';
}

export function getPreviewUrl(fileName: string): string {
  return API_URL + 'thumbs/' + fileName + '-600.webp';
}

export function getThumbUrl(fileName: string): string {
  return API_URL + 'thumbs/' + fileName + '-300.webp';
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
