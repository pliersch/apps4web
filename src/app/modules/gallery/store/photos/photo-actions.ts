import {PhotoModel} from "@gallery/store/photos/photo-model";


// loading photos

export class LoadPhotosAction {
  static readonly type = '[Gallery] Load Photos';
}

export class LoadPhotosSuccessAction {
  static readonly type = '[Gallery] Load Photos success';

  constructor(public payload: { photos: PhotoModel[] }) {
  }
}

export class LoadPhotosFailAction {
  static readonly type = '[Gallery] Load Photos Fail';

  constructor(public payload: { error: any }) {
  }
}

// adding photo

export class AddPhotoAction {
  static readonly type = '[Gallery] Add Photo';

  constructor(public payload: { photo: string }) {
  }
}

export class AddPhotoSuccessAction {
  static readonly type = '[Gallery] Add Photo success';

  constructor(public payload: { photo: PhotoModel }) {
  }
}

export class AddPhotoFailAction {
  static readonly type = '[Gallery] Add Photo fail';

  constructor(public payload: { error: any }) {
  }
}

//

export class ClearPhotoSelectionAction {
  static readonly type = '[Gallery] Clear Photo Selection';
}

//

export class DeletePhotoAction {
  static readonly type = '[Gallery] Delete Photo';

  constructor(public payload: { photo: string }) {
  }
}

//

export class TogglePhotoSelectionAction {
  static readonly type = '[Gallery] Toggle Photo Selection';

  constructor(public payload: { photo: string }) {
  }
}

export class UpdatePhotoAction {
  static readonly type = '[Gallery] Update Photo';

  constructor(public payload: { photo: string }) {
  }
}
