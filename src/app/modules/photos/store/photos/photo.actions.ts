import { User } from "@account/store/user.model";
import { HttpErrorResponse } from '@angular/common/http';
import { SortMode } from "@modules/photos/modules/explorer/components/sorter/photos-sorter.component";
import {
  DeletePhotoDto,
  Photo,
  PhotoMetaData,
  PhotoRequestResult,
  PhotoUpdate
} from "@modules/photos/store/photos/photo.model";
import { Tag } from "@modules/photos/store/tags/tag.model";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";

// meta data

export class LoadMetaData {
  static readonly type = '[Photos] Load MetaData';

}

export class LoadMetaDataSuccess {
  static readonly type = '[Photos] Load MetaData success';

  constructor(public dto: PhotoMetaData) { }
}

export class LoadMetaDataFail {
  static readonly type = '[Photos] Load MetaData Fail';

  constructor(public error: HttpErrorResponse) { }
}

// loading photos

export class LoadPhotos {
  static readonly type = '[Photos] Load Photos';

  constructor(public count?: number,
              public from?: number,
              public tag?: Tag) { }
}

export class LoadPhotosSuccess {
  static readonly type = '[Photos] Load Photos success';

  constructor(public dto: PhotoRequestResult) { }
}

export class LoadPhotosFail {
  static readonly type = '[Photos] Load Photos Fail';

  constructor(public error: HttpErrorResponse) { }
}

// adding photo

export class AddPhoto {
  static readonly type = '[Photos] Add Photo';

  constructor(public photo: File,
              public user: User,
              public tags: Tag[],
              public created: Date,
              public isPrivate: boolean = false) { }
}

export class AddPhotoSuccess {
  static readonly type = '[Photos] Add Photo success';

  constructor(public photo: Photo) { }
}

export class AddPhotoFail {
  static readonly type = '[Photos] Add Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

// current photo

export class SetCurrentPhoto {
  static readonly type = '[Photos] Set Current Photo';

  constructor(public photo: Photo) { }
}

export class SetNextPhoto {
  static readonly type = '[Photos] Set Next Photo';
}

export class SetPreviousPhoto {
  static readonly type = '[Photos] Set Previous Photo';
}

// compare

export class TogglePhotoComparison {
  static readonly type = '[Photos] Toggle Photo Comparison';

  constructor(public photo: Photo) { }
}

export class ClearPhotoComparison {
  static readonly type = '[Photos] Clear Photo Comparison';
}

// manage / edit

export class TogglePhotoEdit {
  static readonly type = '[Photos] Toggle Photo Edit';

  constructor(public photo: Photo) { }
}

export class ToggleSelection {
  static readonly type = '[Photos] Toggle Photo Selection';
}

export class SelectManyPhotosEdit {
  static readonly type = '[Photos] Select Many Photos Edit';

  constructor(public photos: Photo[]) { }
}

export class SelectAllFilteredPhotosEdit {
  static readonly type = '[Photos] Select All Filtered Photos Edit';
}

export class DeselectAllPhotosEdit {
  static readonly type = '[Photos] De-Select All Photos Edit';
}

// downloads

export class TogglePhotoDownload {
  static readonly type = '[Photos] Toggle Photo Download';

  constructor(public photo: Photo) { }
}

export class ToggleAllDownload {
  static readonly type = '[Photos] Toggle Photos Download';
}

export class SelectAllDownloads {
  static readonly type = '[Photos] Select All Download';
}

export class DeselectAllDownloads {
  static readonly type = '[Photos] Clear Download';
}

export class MoveToFinalDownloads {
  static readonly type = '[Photos] Move To Final Downloads';
}

// delete

export class DeletePhoto {
  static readonly type = '[Photos] Delete Photo';

  constructor(public id: string) { }
}

export class DeletePhotoSuccess {
  static readonly type = '[Photos] Delete Photo success';

  constructor(public dto: DeletePhotoDto) { }
}

export class DeletePhotoFail {
  static readonly type = '[Photos] Delete Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

export class DeletePhotos {
  static readonly type = '[Photos] Delete Photos';

  constructor(public ids: string[]) { }
}

export class DeletePhotosSuccess {
  static readonly type = '[Photos] Delete Photos success';

  constructor(public result: DeleteResult, public ids: string[]) { }
}

export class DeletePhotosFail {
  static readonly type = '[Photos] Delete Photos fail';

  constructor(public error: HttpErrorResponse) { }
}

// tags of photo

export class SetTagsOfPhoto {
  static readonly type = '[Photos] Set Tags Of Photo';

  constructor(public photo: Photo, public tags: Tag[]) { }
}

export class SetTagsOfPhotoSuccess {
  static readonly type = '[Photos] Set Tags Of Photo success';

  constructor(public photo: Photo, public tags: Tag[]) { }
}

export class SetTagsOfPhotoFail {
  static readonly type = '[Photos] Set Tags Of Photo fail';

  constructor(public error: HttpErrorResponse) { }
}

export class UpdatePhoto {
  static readonly type = '[Photos] Update Photo';

  constructor(public photo: Photo, public dto: PhotoUpdate) { }
}

export class UpdatePhotoSuccess {
  static readonly type = '[Photos] Update Photo success';

  constructor(public photo: Photo) { }
}

export class UpdatePhotoFail {
  static readonly type = '[Photos] Update Photo fail';

  constructor(public error: HttpErrorResponse) { }
}


// rating

export class SetRating {
  static readonly type = '[Photos] Set Rating Of Photo';

  constructor(public photo: Photo, public rate: number) { }
}

export class SetRatingSuccess {
  static readonly type = '[Photos] Set Rating Of Photo Success';

  constructor(public photo: Photo, public rate: number) { }
}

export class SetRatingFail {
  static readonly type = '[Photos] Set Rating Of Photo Fail';

  constructor(public error: HttpErrorResponse) { }
}

// sorting

export class SetSortMode {
  static readonly type = '[Photos] Set Sort Mode';

  constructor(public mode: SortMode) { }
}

// filtering

export class AddTagFilter {
  static readonly type = '[Photos] Add Tag Filter';

  constructor(public tag: Tag) { }
}

export class RemoveTagFilter {
  static readonly type = '[Photos] Remove Tag Filter';

  constructor(public tag: Tag) { }
}

export class SetRatingFilter {
  static readonly type = '[Photos] Set Rating Filter';

  constructor(public rate: number) { }
}

export class SetFromYearFilter {
  static readonly type = '[Photos] Set From Year Filter';

  constructor(public year: number) { }
}

export class SetToYearFilter {
  static readonly type = '[Photos] Set To Year Filter';

  constructor(public year: number) { }
}

export class ClearFilter {
  static readonly type = '[Photos] Clear Filter';

}

// server sent

export class SetNewPhotosAvailable {
  static readonly type = '[Photos] Set New Photos Available';

}
