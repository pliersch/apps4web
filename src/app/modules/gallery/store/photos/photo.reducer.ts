import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, Update } from '@ngrx/entity';
import { Photo } from './photo.model';
import * as PhotoActions from './photo.actions';
import { PhotoState } from '@gallery/store/photos/photo.state';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  sortComparer: false
});

// @ts-ignore FIXME
export const initialPhotoState: PhotoState = photoAdapter.getInitialState({
  selectedPhoto: null,
  allPhotosLoaded: false
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = photoAdapter.getSelectors();


export const photoReducer = createReducer(
  initialPhotoState,
  on(PhotoActions.addPhoto,
    (state, action) => photoAdapter.addOne(action.photo, state)
  ),
  on(PhotoActions.addPhotos,
    (state, action) => photoAdapter.addMany(action.photos, state)
  ),
  on(PhotoActions.upsertPhoto,
    (state, action) => photoAdapter.upsertOne(action.photo, state)
  ),
  on(PhotoActions.upsertPhotos,
    (state, action) => photoAdapter.upsertMany(action.photos, state)
  ),
  on(PhotoActions.updatePhoto,
    (state, action) => photoAdapter.updateOne(action.photo, state)
  ),
  on(PhotoActions.updatePhotos,
    (state, action) => photoAdapter.updateMany(action.photos, state)
  ),
  on(PhotoActions.deletePhoto,
    (state, action) => photoAdapter.removeOne(action.id, state)
  ),
  on(PhotoActions.deletePhotos,
    (state, action) => photoAdapter.removeMany(action.ids, state)
  ),
  on(PhotoActions.loadPhotosSuccess,
    (state, action) => photoAdapter.setAll(action.photos, state)
  ),
  on(PhotoActions.clearPhotos,
    state => photoAdapter.removeAll(state)
  ),
  on(PhotoActions.clearSelection,
    (state, action) => photoAdapter.updateMany(toggleMany(state), state)
  ),
  on(PhotoActions.togglePhotoSelection,
    (state, action) => photoAdapter.updateOne(toggleOne(action.photo, state), state)
  )
);

function toggleOne(photo: Photo, state: PhotoState): Update<Photo> {
  const all = selectAll(state);
  const selectedPhotos = all.filter(p => p.isSelected === true);
  if (selectedPhotos.length < 2) {
    return select(photo);
  }
  if (photo.isSelected) {
    return deselect(photo);
  } else {
    return select(photo);
  }
}

function toggleMany(state: PhotoState): Update<Photo>[] {
  const all = selectAll(state);
  return all.map(photo => {
    return {
      id: photo.id,
      changes: {
        isSelected: false
      }
    };
  });
}

function select(photo: Photo): Update<Photo> {
  return {
    id: photo.id,
    changes: {
      isSelected: true
    }
  };
}

function deselect(photo: Photo): Update<Photo> {
  return {
    id: photo.id,
    changes: {
      isSelected: false
    }
  };
}
