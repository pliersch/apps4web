export interface Message {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  // chatId: string;
  text: string;
  pictureUrls: string[];
  date: Date;
}

export interface ChatImage {
  comment: string;
  images?: File[];
}

export interface Emoji {
  key: string;
  value: string;
}

//////////////////////////////////////////////////////////
//                   dto
//////////////////////////////////////////////////////////

export interface CreateMessageDto {
  userId: string;
  // chatId: string;
  text: string;
  pictures: File[];
}

export interface UserIdentity {
  id: string;
  givenName: string;
  surName: string;
}

export interface MessageResultDto {
  id: string;
  user: UserIdentity;
  // chatId: string;
  text: string;
  pictureUrls: string[];
  created: Date;
}
