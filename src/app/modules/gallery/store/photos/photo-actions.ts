import {Photo} from "@gallery/store/photos/photo.model";

// loading photos

export class LoadPhotosAction {
  static readonly type = '[Gallery] Load Photos';
}

export class LoadPhotosSuccessAction {
  static readonly type = '[Gallery] Load Photos success';

  constructor(public photos: Photo[]) { }
}

export class LoadPhotosFailAction {
  static readonly type = '[Gallery] Load Photos Fail';

  constructor(public error: any) { }
}


// adding photo

export class AddPhotoAction {
  static readonly type = '[Gallery] Add Photo';

  constructor(public photo: string) { }
}

export class AddPhotoSuccessAction {
  static readonly type = '[Gallery] Add Photo success';

  constructor(public photo: Photo) {
  }
}

export class AddPhotoFailAction {
  static readonly type = '[Gallery] Add Photo fail';

  constructor(public error: any) { }
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

//

export class DeletePhotoAction {
  static readonly type = '[Gallery] Delete Photo';

  constructor(public photo: string) { }
}

export class UpdatePhotoAction {
  static readonly type = '[Gallery] Update Photo';

  constructor(public photo: Photo) { }
}
