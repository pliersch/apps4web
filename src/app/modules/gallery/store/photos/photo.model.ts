import { Tag } from "@gallery/store/tags/tag.model";

export interface Photo {
  id: string;
  index: number;
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
