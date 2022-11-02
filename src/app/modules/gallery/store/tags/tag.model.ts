export interface TagCategory {
  id?: string; // todo remove "?" create category and get id from backend
  name: string; // but problem at GalleryEditTagsComponent::onNewTag
  priority: number;
  tags: Tag[];
}

export interface CreteTagCategoryDto {
  name: string;
  priority: number;
  tags?: string[];
}

export interface UpdateTagCategoryDto {
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
  addedTags: Tag[];
  removedTagIds?: string[];
}

export interface Tag {
  id: string;
  categoryId?: string; // todo don't need in frontend?!
  name: string;
}

export interface CreateTagDto {
  name: string;
  groupId?: string // todo one property have to set
  groupName?: string
}
