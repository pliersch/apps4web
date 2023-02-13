import { User } from "@account/store/user.model";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from "@modules/chat/store/chat.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent {

  @Input()
  user: User;
  @Input()
  messages: Observable<Message[]>;
  @Output()
  imageLoadEvent = new EventEmitter<never>();

  onImageLoad($event: string): void {
    console.log('image load', $event);
  }
}
