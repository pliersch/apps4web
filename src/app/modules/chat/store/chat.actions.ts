import { HttpErrorResponse } from "@angular/common/http";
import { CreateMessageDto, MessageResultDto } from "@modules/chat/store/chat.model";

// loading chat

export class LoadChat {
  static readonly type = '[Chat] Load Chat';

  constructor(public count?: number,
              public from?: number) { }
}

export class LoadChatSuccess {
  static readonly type = '[Chat] Load Chat Success';

  constructor(public messageDtos: MessageResultDto[]) {
  }
}

export class LoadChatFail {
  static readonly type = '[Chat] Load Chat Fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// send message

export class SendMessage {
  static readonly type = '[Chat] Send Message';

  constructor(public dto: CreateMessageDto) {
  }
}

export class SendMessageSuccess {
  static readonly type = '[Chat] Send Message Success';

  constructor(public dto: MessageResultDto) {
  }
}

export class SendMessageFail {
  static readonly type = '[Chat] Send Message Fail';

  constructor(public error: HttpErrorResponse) {
  }
}

// filter messages

export class MessagesFilter {
  static readonly type = '[Chat] Filter Messages';

  constructor(public filter: string) {
  }
}
