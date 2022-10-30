export interface TagCategory {
  id?: string; // todo remove "?" create category and get id from backend
  name: string;
  priority: number;
  tags: Tag[];
}

export interface Tag {
  id?: string;
  categoryId?: string;
  name: string;
}

export interface TagUpdate {
  name: string;
}

export interface TagCategoryUpdate {
  name?: string;
  priority?: number;
}
