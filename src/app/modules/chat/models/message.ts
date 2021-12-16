export interface Message {
  chatID: string;
  // fixme userId vs userName
  userId: string;
  userName: string;
  text: string;
  image?: string;
  date: string;
}
