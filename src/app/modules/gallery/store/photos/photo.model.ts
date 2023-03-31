import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { Tag } from "@gallery/store/tags/tag.model";

export interface Photo {
  id: string;
  fileName: string;
  user: UserIdentity;
  isPrivate: boolean;
  tags: Tag[];
  // createDate: Date;
  recordDate: Date;
  rating: number;
}

export interface PhotoRequestResult {
  readonly photos: Photo[];
  readonly availablePhotos: number;
}

// export class PhotosRequestDto {
//   readonly from?: number = 1;
//   readonly take?: number = 60;
//   readonly tagIds: string[] = [];
// }

export interface PhotoUpdate {
  // id: string;
  addedTagIds?: string[];
  removedTagIds?: string[];
  private?: boolean
}

export interface DeletePhotoDto {
  readonly id: string;
}

export interface PhotoMetaData {
  readonly allPhotosCount: number;
  readonly photoCountByTags: PhotoCountByTag[];
}

export interface PhotoCountByTag {
  tagId: string;
  count: number;
}

