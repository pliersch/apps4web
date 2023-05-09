export interface TagGroup {
  id?: string; // todo remove "?" create TagGroup and get id from backend but !!>>
  name: string; // but problem at PhotosEditTagsComponent::onNewTag
  priority: number;
  tags: Tag[];
}

export interface Tag {
  id: string;
  // tagGroupId?: string;
  name: string;
}

export interface CreteTagGroupDto {
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
