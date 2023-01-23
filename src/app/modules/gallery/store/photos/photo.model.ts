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

export interface PhotoUpdate {
  // id: string;
  addedTagIds?: string[];
  removedTagIds?: string[];
  private?: boolean
}

export interface PhotoDto {
  readonly photos: Photo[];
  readonly meta: PhotoMetaDataDto;
}

export interface PhotoDeleteDto {
  readonly id: string;
}

export interface PhotoMetaDataDto {
  readonly count: number;
}
