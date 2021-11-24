import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PhotoState} from './photo.state';
import {selectAll} from '@gallery/store/photos/photo.reducer';
import {Photo} from '@gallery/store/photos/photo.model';

export const selectPhotosState =
  createFeatureSelector<PhotoState>('photos');

export const allPhotos = createSelector(
  selectPhotosState,
  selectAll
);

export const allSelectedPhotos = createSelector(
  allPhotos,
  (selectedPhotos: Photo[]) => {
    if (selectedPhotos) {
      const photos = selectedPhotos.filter((photo: Photo) => photo.isSelected);
      return selectedPhotos.filter((photo: Photo) => photo.isSelected);
    } else {
      return null;
    }
  }
);

// export const selectPhotoById = (id: string) => createSelector(
//   allPhotos,
//   (selectedPhotos: Photo[]) => {
//     if (selectedPhotos) {
//       return selectedPhotos.find((photo: Photo) => photo.id === id);
//     } else {
//       return null;
//     }
//   }
// );
