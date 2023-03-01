import { User } from "@account/store/user.model";
import { HttpErrorResponse } from '@angular/common/http';
import { SortMode } from "@gallery/modules/share/sorter/gallery-sorter.component";
import {
  DeletePhotoDto,
  Photo,
  PhotoMetaData,
  PhotoRequestResult,
  PhotoUpdate
} from "@gallery/store/photos/photo.model";
import { Tag } from "@gallery/store/tags/tag.model";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";

// meta data

export class LoadMetaData {
  static readonly type = '[Gallery] Load MetaData';

}

export class LoadMetaDataSuccess {
  static readonly type = '[Gallery] Load MetaData success';

  constructor(public dto: PhotoMetaData) { }
}

export class LoadMetaDataFail {
  static readonly type = '[Gallery] Load MetaData Fail';

  constructor(public error: HttpErrorResponse) { }
}

// loading photos

export class LoadPhotos {
  static readonly type = '[Gallery] Load Photos';

  constructor(public count?: number,
              public from?: number,
              public tag?: Tag) { }
}

export class LoadPhotosSuccess {
  static readonly type = '[Gallery] Load Photos success';

  constructor(public dto: PhotoRequestResult) { }
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
              public created: Date,
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

export class TogglePhotoEdit {
  static readonly type = '[Gallery] Toggle Photo Edit';

  constructor(public photo: Photo) { }
}

export class ToggleSelection {
  static readonly type = '[Gallery] Toggle Photo Selection';
}

export class SelectManyPhotosEdit {
  static readonly type = '[Gallery] Select Many Photos Edit';

  constructor(public photos: Photo[]) { }
}

export class SelectAllFilteredPhotosEdit {
  static readonly type = '[Gallery] Select All Filtered Photos Edit';
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

export class DeselectAllDownloads {
  static readonly type = '[Gallery] Clear Download';
}

export class MoveToFinalDownloads {
  static readonly type = '[Gallery] Move To Final Downloads';
}

// delete

export class DeletePhoto {
  static readonly type = '[Gallery] Delete Photo';

  constructor(public id: string) { }
}

export class DeletePhotoSuccess {
  static readonly type = '[Gallery] Delete Photo success';

  constructor(public dto: DeletePhotoDto) { }
}

export class DeletePhotoFail {
  static readonly type = '[Gallery] Delete Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

export class DeletePhotos {
  static readonly type = '[Gallery] Delete Photos';

  constructor(public ids: string[]) { }
}

export class DeletePhotosSuccess {
  static readonly type = '[Gallery] Delete Photos success';

  constructor(public result: DeleteResult, public ids: string[]) { }
}

export class DeletePhotosFail {
  static readonly type = '[Gallery] Delete Photos fail';

  constructor(public error: HttpErrorResponse) { }
}

// tags of photo

export class SetTagsOfPhoto {
  static readonly type = '[Gallery] Set Tags Of Photo';

  constructor(public photo: Photo, public tags: Tag[]) { }
}

export class SetTagsOfPhotoSuccess {
  static readonly type = '[Gallery] Set Tags Of Photo success';

  constructor(public photo: Photo, public tags: Tag[]) { }
}

export class SetTagsOfPhotoFail {
  static readonly type = '[Gallery] Set Tags Of Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

export class UpdatePhoto {
  static readonly type = '[Gallery] Update Photo';

  constructor(public photo: Photo, public dto: PhotoUpdate) { }
}

export class UpdatePhotoSuccess {
  static readonly type = '[Gallery] Update Photo success';

  constructor(public photo: Photo) { }
}

export class UpdatePhotoFail {
  static readonly type = '[Gallery] Update Photo fail';

  constructor(public error: HttpErrorResponse) { }
}


// rating

export class SetRating {
  static readonly type = '[Gallery] Set Rating Of Photo';

  constructor(public photo: Photo, public rate: number) { }
}

export class SetRatingSuccess {
  static readonly type = '[Gallery] Set Rating Of Photo Success';

  constructor(public photo: Photo, public rate: number) { }
}

export class SetRatingFail {
  static readonly type = '[Gallery] Set Rating Of Photo Fail';

  constructor(public error: HttpErrorResponse) { }
}

// sorting

export class SetSortMode {
  static readonly type = '[Gallery] Set Sort Mode';

  constructor(public mode: SortMode) { }
}

// filtering

export class AddTagFilter {
  static readonly type = '[Gallery] Add Tag Filter';

  constructor(public tag: Tag) { }
}

export class RemoveTagFilter {
  static readonly type = '[Gallery] Remove Tag Filter';

  constructor(public tag: Tag) { }
}

export class SetRatingFilter {
  static readonly type = '[Gallery] Set Rating Filter';

  constructor(public rate: number) { }
}

export class SetFromYearFilter {
  static readonly type = '[Gallery] Set From Year Filter';

  constructor(public year: number) { }
}

export class SetToYearFilter {
  static readonly type = '[Gallery] Set To Year Filter';

  constructor(public year: number) { }
}

export class ClearFilter {
  static readonly type = '[Gallery] Clear Filter';

}

// server sent

export class SetNewPhotosAvailable {
  static readonly type = '[Gallery] Set New Photos Available';

}
