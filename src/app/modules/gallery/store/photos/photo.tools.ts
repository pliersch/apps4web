import { GALLERY_CONSTANTS } from "@gallery/const";
import { SortMode } from "@gallery/modules/explorer/components/sorter/gallery-sorter.component";
import { Photo } from "@gallery/store/photos/photo.model";
import { Tag } from "@gallery/store/tags/tag.model";

const BASE_URL = GALLERY_CONSTANTS.PHOTO_DOWNLOAD_BASE_URL;

export function filterByTags(photos: Photo[], tags: Tag[]): Photo[] {
  const result = [];
  for (const photo of photos) {
    const containsAllTags = tags.every(tag => photo.tags.find(tag2 => tag.name === tag2.name));
    if (containsAllTags) {
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
  const result = [];
  let year: number;
  if (from === -1 && to === -1) {
    return photos;
  }
  if (to === -1) {
    for (const photo of photos) {
      year = photo.recordDate.getFullYear();
      if (year >= from) {
        result.push(photo);
      }
    }
    return result;
  }
  for (const photo of photos) {
    year = photo.recordDate.getFullYear();
    if (year >= from && year <= to) {
      result.push(photo);
    }
  }
  return result;
}

export function sort(photos: Photo[], mode: SortMode): Photo[] {
  switch (mode) {
    case SortMode.Newest:
      return photos.sort(sortByNewest);
    case SortMode.Oldest:
      return photos.sort(sortByOldest);
    case SortMode.HighestRating:
      return photos.sort(sortByHighestRating);
    case SortMode.LowestRating:
      return photos.sort(sortByLowestRating);
    default:
      return photos;
  }
}

function sortByNewest(p1: Photo, p2: Photo): number {
  const compare = p1.recordDate.getTime() - p2.recordDate.getTime();
  if (compare > 0) {
    return -1;
  } else if (compare < 0) {
    return 1;
  } else {
    return 0;
  }
}

function sortByOldest(p1: Photo, p2: Photo): number {
  const compare = p1.recordDate.getTime() - p2.recordDate.getTime();
  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else {
    return 0;
  }
}

function sortByHighestRating(p1: Photo, p2: Photo): number {
  const compare = p1.rating - p2.rating;
  if (compare > 0) {
    return -1;
  } else if (compare < 0) {
    return 1;
  } else {
    return 0;
  }
}

function sortByLowestRating(p1: Photo, p2: Photo): number {
  const compare = p1.rating - p2.rating;
  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else {
    return 0;
  }
}

export function getPhotoUrl(fileName: string): string {
  return BASE_URL + 'full/' + fileName;
}

export function getW900Url(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-900.webp';
}

export function getW600Url(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-600.webp';
}

export function getW300Url(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-300.webp';
}

function sliceExtension(fileName: string): string {
  return fileName.slice(0, fileName.lastIndexOf('.'));
}

