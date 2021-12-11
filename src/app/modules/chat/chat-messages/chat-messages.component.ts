import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input()
  messages: Observable<Message[]>;

  userName: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log('init');
  }

  onImageLoad($event: string): void {
    console.log('image load', $event);
  }

}
