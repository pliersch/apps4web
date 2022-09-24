export interface Tag {
  id?: string;
  tagName: string;
  priority: number;
  entries: string[];
}

export interface TagUpdate {
  entries: string[];
}
