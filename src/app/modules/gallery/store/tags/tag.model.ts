export interface TagCategory {
  id?: string; // todo remove "?" create category and get id from backend
  name: string;
  priority: number;
  tags: Tag[];
}

export interface Tag {
  id?: number;
  name: string;
}

export interface TagUpdate {
  entries: Tag[];
}
