import { Tag } from "@gallery/store/tags/tag.model";

export interface Photo {
  id: string;
  index: number;
  fileName: string;
  tags: Tag[];
  // createDateTime: Date;
  recordDate: Date;
  // baseUrl: string;
  rating: number;
}

export interface PhotoUpdate {
  id: string;
  tags?: string[];
  rating?: number;
}
