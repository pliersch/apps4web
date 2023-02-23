import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { CreateMessageDto, MessageResultDto } from "@modules/chat/store/chat.model";
import { Observable } from "rxjs";

const BASE_URL = `${environment.apiUrl}/chat`;

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(dto: CreateMessageDto): Observable<MessageResultDto> {
    if (dto.pictures) {
      return this.sendPictureMessage(dto)
    }
    return this.http.post<MessageResultDto>(BASE_URL, dto);
  }

  sendPictureMessage(dto: CreateMessageDto): Observable<MessageResultDto> {
    const formData = new FormData();
    formData.append('userId', dto.userId);
    formData.append('text', dto.text);
    formData.append('image', dto.pictures![0]);
    return this.http.post<MessageResultDto>(BASE_URL + '/pictures', formData);
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
