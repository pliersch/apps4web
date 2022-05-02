export interface Photo {
  id: string;
  fileName: string;
  tags: string[];
  createDateTime: Date;
  baseUrl: string;
  isSelected: boolean;
}

export interface PhotoUpdate {
  id: string;
  tags?: string[];
}
