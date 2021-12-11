import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "@modules/chat/models/message";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";

const BASE_URL = `${environment.apiUrl}/chat`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  sendMessage(msg: Message): Observable<Message> {
    // return this.http.post<Message>(BASE_URL + '/file', msg);
    return this.http.post<Message>(BASE_URL, msg);
    // return this.http.get<Message>(BASE_URL);
  }

  loadChat(chatName?: string): Observable<Message[]> {
    return this.http.get<Message[]>(BASE_URL);
  }
}
