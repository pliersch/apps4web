import { Photo } from "@gallery/store/photos/photo.model";

const BASE_URL = 'http://localhost:3000/images/gallery/';

export function filterByTags(photos: Photo[], tags: string[]): Photo[] {
  const result = [];
  for (const photo of photos) {
    const some = tags.every(r => photo.tags.includes(r));
    if (some) {
      result.push(photo);
    }
  }
  return result;
}

export function filterByRating(photos: Photo[], rate: number): Photo[] {
  const result = [];
  for (const photo of photos) {
    if (photo.rating >= rate) {
      result.push(photo);
    }
  }
  return result;
}

export function filterByYear(photos: Photo[], from: number, to: number): Photo[] {
  console.log('filterByYear filterByYear: ', photos[0].recordDate.getFullYear())
  const result = [];
  for (const photo of photos) {
    if (photo.recordDate.getFullYear() >= from && photo.recordDate.getFullYear() <= to) {
      result.push(photo);
    }
  }
  return result;
}

export function getPhotoUrl(fileName: string): string {
  // fileName = fileName.slice(0, fileName.lastIndexOf('.') - 1);
  return BASE_URL + 'full/' + fileName;
}

export function getPreviewUrl(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-600.webp';
}

export function getThumbUrl(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-300.webp';
}

function sliceExtension(fileName: string): string {
  return fileName.slice(0, fileName.lastIndexOf('.'));
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
