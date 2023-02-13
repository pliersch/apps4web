import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { CreateMessageDto, Message, MessageResultDto } from "@modules/chat/store/chat.model";
import { Observable } from "rxjs";

const BASE_URL = `${environment.apiUrl}/chat`;

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(msg: CreateMessageDto): Observable<MessageResultDto> {
    if (msg.pictures) {
      this.sendImages(msg.pictures)
    }
    return this.http.post<MessageResultDto>(BASE_URL, msg);
  }

  sendImages(images: File[]): Observable<Message> {
    const formData = new FormData();
    formData.append('image', images[0]);
    return this.http.post<Message>(BASE_URL + '/file', formData);
  }

  loadChat(chatId: string, from: number, take: number): Observable<MessageResultDto[]> {
    return this.http.get<MessageResultDto[]>(BASE_URL, {
      params: {
        chatId: chatId,
        from: from,
        take: take,
      }
    });
  }
}
