import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";

// meta data

export class LoadMetaDataAction {
  static readonly type = '[Gallery] Load MetaData';

}

export class LoadMetaDataSuccessAction {
  static readonly type = '[Gallery] Load MetaData success';

  constructor(public dto: PhotoMetaDataDto) { }
}

export class LoadMetaDataFailAction {
  static readonly type = '[Gallery] Load MetaData Fail';

  constructor(public error: any) { }
}

export class UpdateMetaDataAction {
  static readonly type = '[Gallery] Update AllPhotos Count';

  constructor(public count: number) { }
}

// loading photos

export class LoadPhotosAction {
  static readonly type = '[Gallery] Load Photos';

  constructor(public count: number, public from?: number) { }
}

export class LoadPhotosSuccessAction {
  static readonly type = '[Gallery] Load Photos success';

  constructor(public dto: PhotoDto) { }
}

export class LoadPhotosFailAction {
  static readonly type = '[Gallery] Load Photos Fail';

  constructor(public error: any) { }
}


// adding photo

export class AddPhotoAction {
  static readonly type = '[Gallery] Add Photo';

  constructor(public photo: File, public tags: string[], public created: number) { }
}

export class AddPhotoSuccessAction {
  static readonly type = '[Gallery] Add Photo success';

  constructor(public photo: Photo) { }
}

export class AddPhotoFailAction {
  static readonly type = '[Gallery] Add Photo fail';

  constructor(public error: any) { }
}

// current photo

export class SetCurrentPhotoAction {
  static readonly type = '[Gallery] Set Current Photo';

  constructor(public photo: Photo) { }
}

export class SetNextPhotoAction {
  static readonly type = '[Gallery] Set Next Photo';
}

export class SetPreviousPhotoAction {
  static readonly type = '[Gallery] Set Previous Photo';
}

// compare

export class TogglePhotoSelectionAction {
  static readonly type = '[Gallery] Toggle Photo Selection';

  constructor(public photo: Photo) { }
}

export class ClearPhotoSelectionAction {
  static readonly type = '[Gallery] Clear Photo Selection';
}

// selection download

export class SelectAllPhotosAction {
  static readonly type = '[Gallery] Select All Photos Download';
}

export class SelectManyPhotosAction {
  static readonly type = '[Gallery] Select Many Photos Download';

  constructor(public photos: Photo[]) { }
}

// export class AddManyPhotosAction {
//   static readonly type = '[Gallery] Add Many Photos Download';
//
//   constructor(public photos: Photo[]) { }
// }

export class DeselectAllPhotosAction {
  static readonly type = '[Gallery] Clear Photo Download';
}

export class TogglePhotosDownloadAction {
  static readonly type = '[Gallery] Toggle Photos Download';
}

export class TogglePhotoDownloadAction {
  static readonly type = '[Gallery] Toggle Photo Download';

  constructor(public photo: Photo) { }
}

// delete

export class DeletePhotoAction {
  static readonly type = '[Gallery] Delete Photo';

  constructor(public id: string) { }
}

export class DeletePhotoSuccessAction {
  static readonly type = '[Gallery] Delete Photo success';

  constructor(public photoUpdate: PhotoUpdate) { }
}

export class DeletePhotoFailAction {
  static readonly type = '[Gallery] Delete Photo fail';

  constructor(public error: any) { }
}

// update

export class UpdatePhotoAction {
  static readonly type = '[Gallery] Update Photo';

  constructor(public photo: Photo) { }
}

// tags of picture

export class SetTagsOfPicture {
  static readonly type = '[Gallery] Set Tags Of Picture';

  constructor(public photo: Photo, public tags: string[]) {
  }
}

export class SetTagsOfPictureSuccess {
  static readonly type = '[Gallery] Set Tags Of Picture success';

  constructor(public update: PhotoUpdate) {
  }
}

export class SetTagsOfPictureFail {
  static readonly type = '[Gallery] Set Tags Of Picture fail';

  constructor(public error: any) {
  }
}

export class AddTagToPicture {
  static readonly type = '[Gallery] Add Tag To Picture';

  constructor(public photo: Photo, public tag: string) {
  }
}

export class AddTagToPictureSuccess {
  static readonly type = '[Gallery] Add Tag To Picture success';

  constructor(public update: PhotoUpdate) {
  }
}

export class AddTagToPictureFail {
  static readonly type = '[Gallery] Add Tag To Picture fail';

  constructor(public error: any) {
  }
}

export class RemoveTagFromPicture {
  static readonly type = '[Gallery] Remove Tag From Picture';

  constructor(public photo: Photo, public tag: string) {
  }
}

export class RemoveTagFromPictureSuccess {
  static readonly type = '[Gallery] Remove Tag From Picture success';

  constructor(public update: PhotoUpdate) {
  }
}

export class RemoveTagFromPictureFail {
  static readonly type = '[Gallery] Remove Tag From Picture fail';

  constructor(public error: any) {
  }
}

// rating

export class SetRating {
  static readonly type = '[Gallery] Set Rating Of Photo';

  constructor(public photo: Photo, public rate: number) {
  }
}

export class SetRatingSuccess {
  static readonly type = '[Gallery] Set Rating Of Photo Success';

  constructor(public update: PhotoUpdate) {
  }
}

export class SetRatingFail {
  static readonly type = '[Gallery] Set Rating Of Photo Fail';

  constructor(public error: any) {
  }
}
