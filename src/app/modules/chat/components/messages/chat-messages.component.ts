import { User } from "@account/store/user.model";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from "@modules/chat/store/chat.model";
import { Observable } from "rxjs";
import { ChatImageItemComponent } from "../image-item/chat-image-item.component";
import { NgFor, NgIf, AsyncPipe, DatePipe } from "@angular/common";

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-messages.component.html',
    styleUrls: ['./chat-messages.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, ChatImageItemComponent, AsyncPipe, DatePipe]
})
export class ChatMessagesComponent {

  @Input()
  user: User;
  @Input()
  messages: Observable<Message[]>;
  @Output()
  imageLoadEvent = new EventEmitter<never>();

  onImageLoad(): void {
    this.imageLoadEvent.emit();
  }
}
