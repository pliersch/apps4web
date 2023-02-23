import { CHAT_CONSTANTS } from "@modules/chat/const";
import { Message, MessageResultDto, UserIdentity } from "@modules/chat/store/chat.model";

const BASE_URL = CHAT_CONSTANTS.PHOTO_DOWNLOAD_BASE_URL;

export function createMessage(dto: MessageResultDto): Message {
  const pictureUrls = dto.fileNames ? getThumbUrls(dto.fileNames) : [];
  return {
    id: dto.id,
    userId: dto.user.id,
    userFirstName: dto.user.givenName,
    userLastName: dto.user.surName,
    date: dto.created,
    text: dto.text,
    pictureUrls: pictureUrls,
  }
}

export function addToUserIdentities(identities: UserIdentity[], dto: MessageResultDto): UserIdentity[] {
  const id = dto.user.id;
  if (!identities.find(identity => identity.id === id)) {
    identities.push(dto.user)
  }
  return identities;
}

export function getPhotoUrl(fileName: string): string {
  return BASE_URL /*+ 'full/'*/ + fileName;
}

export function getThumbUrls(fileNames: string[]): string[] {
  const urls: string[] = [];
  for (const fileName of fileNames) {
    //todo provide thumb
    // urls.push(getThumbUrl(fileName))
    urls.push(getPhotoUrl(fileName))
  }
  return urls;
}

export function getThumbUrl(fileName: string): string {
  return BASE_URL + 'thumbs/' + sliceExtension(fileName) + '-900.webp';
}

function sliceExtension(fileName: string): string {
  return fileName.slice(0, fileName.lastIndexOf('.'));
}
