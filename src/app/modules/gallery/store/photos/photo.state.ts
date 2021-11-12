import { EntityState } from '@ngrx/entity';
import { Photo } from '@gallery/store/photos/photo.model';

export interface PhotoState extends EntityState<Photo> {
  allPhotosLoaded: boolean;
  selectedPhoto: Photo;
}
