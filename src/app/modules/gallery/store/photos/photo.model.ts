import { Tag } from "@gallery/store/tags/tag.model";

export interface Photo {
  id: string;
  fileName: string;
  isPrivate: boolean;
  tags: Tag[];
  // createDate: Date;
  recordDate: Date;
  rating: number;
}

export interface PhotoDto {
  readonly photos: Photo[];
  readonly meta: PhotoMetaDataDto;
}

export class PhotosRequestDto {
  readonly from?: number = 1;
  readonly take?: number = 60;
  readonly tagIds: string[] = [];
}

export interface PhotoUpdate {
  // id: string;
  addedTagIds?: string[];
  removedTagIds?: string[];
  private?: boolean
}

export interface PhotoDeleteDto {
  readonly id: string;
}

export interface PhotoMetaDataDto {
  readonly allPhotosCount: number;
  readonly photoCountByTags: PhotoCountByTag[];
}

export interface PhotoCountByTag {
  tagId: string;
  count: number;
}

