export interface Message {
  chatID: string;
  // fixme userId vs userName
  userId: string;
  userName: string;
  text: string;
  files: File[];
  images: string[];
  date: string;
}
