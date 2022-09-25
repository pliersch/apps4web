export interface Photo {
  id: string;
  fileName: string;
  tags: string[];
  // createDateTime: Date;
  recordDate: Date;
  // baseUrl: string;
  isSelected: boolean;
  rating: number;
}

export interface PhotoUpdate {
  id: string;
  tags?: string[];
  rating?: number;
}
