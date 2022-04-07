import {Photo} from "@gallery/store/photos/photo.model";

export function filterSomeTags(photos: Photo[], tags: string[]): Photo[] {
  let result = [];
  for (const photo of photos) {
    if (photo.tags.some(tag => tags.includes(tag))) {
      result.push(photo);
    }
  }
  return result;
}

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
