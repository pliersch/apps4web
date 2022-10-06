export interface Photo {
  id: string;
  index: number;
  fileName: string;
  tags: string[];
  // createDateTime: Date;
  recordDate: Date;
  // baseUrl: string;
  isSelected: boolean; // todo move to seperated array
  rating: number;
}

export interface PhotoUpdate {
  id: string;
  tags?: string[];
  rating?: number;
}
