import { environment } from "@environments/environment";

export const CHAT_CONSTANTS = {
  MESSAGE_LOAD_COUNT: 50,
  PHOTO_DOWNLOAD_BASE_URL: `${environment.apiUrl}/images/chat/`,
} as const;
