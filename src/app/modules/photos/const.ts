import { environment } from "@environments/environment";

export const PHOTOS_CONSTANTS = {
  PHOTO_LOAD_COUNT: 60,
  PHOTO_DOWNLOAD_BASE_URL: `${environment.apiUrl}/images/gallery/`,
} as const;
