import { UserIdentity } from "@app/core/interfaces/user-identiy";

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
  pictures?: File[];
}

export interface MessageResultDto {
  id: string;
  user: UserIdentity;
  // chatId: string;
  text: string;
  fileNames: string[];
  created: Date;
}

export interface ChatSseData {
  readonly userId: string;
}
