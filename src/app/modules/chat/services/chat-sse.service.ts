import { Injectable } from '@angular/core';
import { ServerSentService } from "@app/common/services/base-server-sent.service";
import { MessageResultDto } from "@modules/chat/store/chat.model";

export type ChatSseEvent = {
  'message_added': MessageResultDto;
}

@Injectable({
  providedIn: 'root'
})
export class ChatSseService extends ServerSentService<ChatSseEvent> {

  constructor() {
    super();
  }

  protected getServerEvents(): string[] {
    return ['chat'];
  }
}
