import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Emoji } from "@modules/chat/store/chat.model";

@Component({
  selector: 'app-chat-emoji-item',
  templateUrl: './chat-emoji-item.component.html',
  styleUrls: ['./chat-emoji-item.component.scss']
})
export class ChatEmojiItemComponent {

  @Input() emoji!: Emoji;
  @Output() clickEvent = new EventEmitter<Emoji>();

  onEmojiClick() {
    this.clickEvent.emit(this.emoji);
  }
}
