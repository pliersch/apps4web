export interface TagCategory {
  id?: string; // todo remove "?" create category and get id from backend but !!>>
  name: string; // but problem at GalleryEditTagsComponent::onNewTag
  priority: number;
  tags: Tag[];
}

export interface CreteTagCategoryDto {
  name: string;
  priority: number;
  tagNames?: string[];
}

export interface UpdateTagGroupDto {
  id: string;
  name?: string;
  priority?: number;
  addedNames?: string[];
  removedTagIds?: string[];
}

export interface UpdateTagGroupResultDto {
  id: string;
  name?: string;
  priority?: number;
  addedTags?: Tag[];
  removedTagIds?: string[];
}

export interface Tag {
  id: string;
  categoryId?: string; // todo don't need in frontend?!
  name: string;
}
