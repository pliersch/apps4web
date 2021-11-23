import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chat-image-item',
  templateUrl: './chat-image-item.component.html',
  styleUrls: ['./chat-image-item.component.scss']
})
export class ChatImageItemComponent {

  @Output()
  imageLoadEvent = new EventEmitter<string>();

  src: string;

  constructor() {
  }

}
