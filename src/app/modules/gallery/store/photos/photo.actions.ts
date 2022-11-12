import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";
import { HttpErrorResponse } from '@angular/common/http';
import { Tag } from "@gallery/store/tags/tag.model";
import { User } from "@modules/user-managaer/store/user";

// meta data

export class LoadMetaData {
  static readonly type = '[Gallery] Load MetaData';

}

export class LoadMetaDataSuccess {
  static readonly type = '[Gallery] Load MetaData success';

  constructor(public dto: PhotoMetaDataDto) { }
}

export class LoadMetaDataFail {
  static readonly type = '[Gallery] Load MetaData Fail';

  constructor(public error: HttpErrorResponse) { }
}

// loading photos

export class LoadPhotos {
  static readonly type = '[Gallery] Load Photos';

  constructor(public count: number, public from?: number) { }
}

export class LoadPhotosSuccess {
  static readonly type = '[Gallery] Load Photos success';

  constructor(public dto: PhotoDto) { }
}

export class LoadPhotosFail {
  static readonly type = '[Gallery] Load Photos Fail';

  constructor(public error: HttpErrorResponse) { }
}

// adding photo

export class AddPhoto {
  static readonly type = '[Gallery] Add Photo';

  constructor(public photo: File,
              public user: User,
              public tags: Tag[],
              public created: number,
              public isPrivate: boolean = false) { }
}

export class AddPhotoSuccess {
  static readonly type = '[Gallery] Add Photo success';

  constructor(public photo: Photo) { }
}

export class AddPhotoFail {
  static readonly type = '[Gallery] Add Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

// current photo

export class SetCurrentPhoto {
  static readonly type = '[Gallery] Set Current Photo';

  constructor(public photo: Photo) { }
}

export class SetNextPhoto {
  static readonly type = '[Gallery] Set Next Photo';
}

export class SetPreviousPhoto {
  static readonly type = '[Gallery] Set Previous Photo';
}

// compare

export class TogglePhotoComparison {
  static readonly type = '[Gallery] Toggle Photo Comparison';

  constructor(public photo: Photo) { }
}

export class ClearPhotoComparison {
  static readonly type = '[Gallery] Clear Photo Comparison';
}

// manage / edit

export class TogglePhotoGroupEdit {
  static readonly type = '[Gallery] Toggle Photo Group Edit';

  constructor(public photo: Photo) { }
}

export class SelectManyPhotosEdit {
  static readonly type = '[Gallery] Select Many Photos Edit';

  constructor(public photos: Photo[]) { }
}

export class SelectAllPhotosEdit {
  static readonly type = '[Gallery] Select All Photos Edit';
}

export class DeselectAllPhotosEdit {
  static readonly type = '[Gallery] De-Select All Photos Edit';
}

// downloads

export class TogglePhotoDownload {
  static readonly type = '[Gallery] Toggle Photo Download';

  constructor(public photo: Photo) { }
}

export class ToggleAllDownload {
  static readonly type = '[Gallery] Toggle Photos Download';
}

export class SelectAllDownloads {
  static readonly type = '[Gallery] Select All Download';
}

export class AddToDownload {
  static readonly type = '[Gallery] Add To Download';

  constructor(public photos: Photo[]) { }
}

export class DeselectAllDownloads {
  static readonly type = '[Gallery] Clear Download';
}

// delete

export class DeletePhoto {
  static readonly type = '[Gallery] Delete Photo';

  constructor(public id: string) { }
}

export class DeletePhotoSuccess {
  static readonly type = '[Gallery] Delete Photo success';

  constructor(public photoUpdate: PhotoUpdate) { }
}

export class DeletePhotoFail {
  static readonly type = '[Gallery] Delete Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

// export class DeletePhotos {
//   static readonly type = '[Gallery] Delete Photos';
//
//   constructor(public ids: string[]) { }
// }
//
// export class DeletePhotosSuccess {
//   static readonly type = '[Gallery] Delete Photos success';
//
//   constructor(public photoUpdate: PhotoUpdate) { }
// }
//
// export class DeletePhotosFail {
//   static readonly type = '[Gallery] Delete Photos fail';
//
//   constructor(public error: HttpErrorResponse) { }
// }

// tags of photo

export class SetTagsOfPhoto {
  static readonly type = '[Gallery] Set Tags Of Photo';

  constructor(public photo: Photo, public tags: Tag[]) {
  }
}

export class SetTagsOfPhotoSuccess {
  static readonly type = '[Gallery] Set Tags Of Photo success';

  constructor(public photo: Photo, public tags: Tag[]) { }
}

export class SetTagsOfPhotoFail {
  static readonly type = '[Gallery] Set Tags Of Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

/*

export class AddTagsToPhoto {
  static readonly type = '[Gallery] Add Tags To Photo';

  constructor(public photo: Photo, public tags: string[]) {
  }
}

export class AddTagsToPhotoSuccess {
  static readonly type = '[Gallery] Add Tags To Photo success';

  constructor(public photo: Photo, public tags: string[]) {
  }
}

export class AddTagsToPhotoFail {
  static readonly type = '[Gallery] Add Tags To Photo fail';

  constructor(public error: HttpErrorResponse) {
  }
}

export class RemoveTagsFromPhoto {
  static readonly type = '[Gallery] Remove Tags From Photo';

  constructor(public photo: Photo, public tags: string[]) {
  }
}

export class RemoveTagsFromPhotoSuccess {
  static readonly type = '[Gallery] Remove Tags From Photo success';

  constructor(public photo: Photo, public tags: string[]) {
  }
}

export class RemoveTagsFromPhotoFail {
  static readonly type = '[Gallery] Remove Tags From Photo fail';

  constructor(public error: HttpErrorResponse) {
  }
}
*/

// rating

export class SetRating {
  static readonly type = '[Gallery] Set Rating Of Photo';

  constructor(public photo: Photo, public rate: number) { }
}

export class SetRatingSuccess {
  static readonly type = '[Gallery] Set Rating Of Photo Success';

  constructor(public photo: Photo, public rate: number) {
  }
}

export class SetRatingFail {
  static readonly type = '[Gallery] Set Rating Of Photo Fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// filtering

export class AddTagFilter {
  static readonly type = '[Gallery] Add Tag Filter';

  constructor(public filter: Tag) {
  }
}

export class RemoveTagFilter {
  static readonly type = '[Gallery] Remove Tag Filter';

  constructor(public filter: Tag) { }
}

export class SetRatingFilter {
  static readonly type = '[Gallery] Set Rating Filter';

  constructor(public rate: number) {
  }
}

export class SetFromYearFilter {
  static readonly type = '[Gallery] Set From Year Filter';

  constructor(public year: number) { }
}

export class SetToYearFilter {
  static readonly type = '[Gallery] Set To Year Filter';

  constructor(public year: number) {
  }
}

export class ClearFilter {
  static readonly type = '[Gallery] Clear Filter';

}

// server sent

export class SetNewPhotosAvailable {
  static readonly type = '[Gallery] Set New Photos Available';

}
