export interface Tag {
  id?: string;
  tagName: string;
  entries: string[];
}

export interface TagUpdate {
  entries: string[];
}
