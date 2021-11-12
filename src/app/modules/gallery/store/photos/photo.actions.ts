import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Photo } from './photo.model';

export const loadPhotos = createAction(
  '[Photo/API] Load Photos'
);

export const loadPhotosSuccess = createAction(
  '[Photo/API] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photo/API] Load Photos Failure',
  props<{ error: any }>()
);

export const addPhoto = createAction(
  '[Photo/API] Add Photo',
  props<{ photo: Photo }>()
);

export const upsertPhoto = createAction(
  '[Photo/API] Upsert Photo',
  props<{ photo: Photo }>()
);

export const addPhotos = createAction(
  '[Photo/API] Add Photos',
  props<{ photos: Photo[] }>()
);

export const upsertPhotos = createAction(
  '[Photo/API] Upsert Photos',
  props<{ photos: Photo[] }>()
);

export const updatePhoto = createAction(
  '[Photo/API] Update Photo',
  props<{ photo: Update<Photo> }>()
);

export const updatePhotos = createAction(
  '[Photo/API] Update Photos',
  props<{ photos: Update<Photo>[] }>()
);

export const deletePhoto = createAction(
  '[Photo/API] Delete Photo',
  props<{ id: string }>()
);

export const deletePhotos = createAction(
  '[Photo/API] Delete Photos',
  props<{ ids: string[] }>()
);

export const clearPhotos = createAction(
  '[Photo/API] Clear Photos'
);

export const togglePhotoSelection = createAction(
  '[Photo/API] Toggle Photo Selection',
  props<{ photo: Photo }>()
);

export const clearSelection = createAction(
  '[Photo/Selection] Clear Selection'
);
