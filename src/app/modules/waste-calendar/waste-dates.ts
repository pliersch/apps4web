export interface WasteDate {
  type: string;
  date: string;
}

export interface WasteKey {
  type: string;
  short: string;
}

export interface WasteEvent {
  wasteType: string;
  date: Date;
}
