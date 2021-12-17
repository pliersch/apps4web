import {Message} from "@modules/chat/models/message";

// loading chat

export class LoadChat {
  static readonly type = '[Chat] Load Chat';
}

export class LoadChatSuccess {
  static readonly type = '[Chat] Load Chat Success';

  constructor(public messages: Message[]) {
  }
}

export class LoadChatFail {
  static readonly type = '[Chat] Load Chat Fail';

  constructor(public error: any) {
  }
}

// send message

export class SendMessage {
  static readonly type = '[Chat] Send Message';

  constructor(public message: Message) {
  }
}

export class SendMessageSuccess {
  static readonly type = '[Chat] Send Message Success';

  constructor(public message: Message) {
  }
}

export class SendMessageFail {
  static readonly type = '[Chat] Send Message Fail';

  constructor(public error: any) {
  }
}

// filter messages

export class MessagesFilter {
  static readonly type = '[Chat] Filter Messages';

  constructor(public filter: string) {
  }
}
