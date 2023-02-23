import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-image-item',
  templateUrl: './chat-image-item.component.html',
  styleUrls: ['./chat-image-item.component.scss']
})
export class ChatImageItemComponent {

  @Output()
  imageLoadEvent = new EventEmitter<never>();

  @Input()
  src: string;

  onLoad(): void {
    this.imageLoadEvent.emit()
  }
}
