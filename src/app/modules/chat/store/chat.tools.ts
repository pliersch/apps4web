import { Message, MessageResultDto, UserIdentity } from "@modules/chat/store/chat.model";

export function createMessage(dto: MessageResultDto): Message {
  const pictures = dto.pictureUrls ? dto.pictureUrls : [];
  return {
    id: dto.id,
    userId: dto.user.id,
    userFirstName: dto.user.givenName,
    userLastName: dto.user.surName,
    date: dto.created,
    text: dto.text,
    pictureUrls: pictures,
  }
}

export function addToUserIdentities(identities: UserIdentity[], dto: MessageResultDto): UserIdentity[] {
  const id = dto.user.id;
  if (!identities.find(identity => identity.id === id)) {
    identities.push(dto.user)
  }
  return identities;
}
