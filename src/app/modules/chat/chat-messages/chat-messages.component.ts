import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from "@modules/chat/models/message";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {

  @Output()
  imageLoadEvent = new EventEmitter<never>();

  userName: string;
  messages: Observable<Message[]>;

  constructor() {
  }

  ngOnInit(): void {
    console.log('init');
  }

  onImageLoad($event: string) {
    console.log('image load', $event);
  }

}
