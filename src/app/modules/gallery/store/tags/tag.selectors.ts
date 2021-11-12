import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from '@gallery/store/tags/tag.reducer';
import { EntityState } from '@ngrx/entity';
import { Tag } from '@gallery/store/tags/tag.model';


export interface TagState extends EntityState<Tag> {

}

export const selectTagState =
  createFeatureSelector<TagState>('tags');

export const allTags = createSelector(
  selectTagState,
  selectAll
);

// export const selectPhotoById = (id: string) => createSelector(
//   allTags,
//   (selectedPhotos: Photo[]) => {
//     if (selectedPhotos) {
//       return selectedPhotos.find((photo: Photo) => photo.id === id);
//     } else {
//       return null;
//     }
//   }
// );
