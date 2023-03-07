import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import emoji from "@assets/json/emoji.json";
import { Emoji } from "@modules/chat/store/chat.model";

@Component({
  selector: 'app-chat-emoji-picker',
  templateUrl: './chat-emoji-picker.component.html',
  styleUrls: ['./chat-emoji-picker.component.scss']
})
export class ChatEmojiPickerComponent implements OnInit {

  @Output()
  emojiSelectEvent = new EventEmitter<Emoji>();

  @Input()
  visible = false;

  emojis: Emoji[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.emojis = emoji.emojis
  }

  onEmojiClick(emoji: Emoji): void {
    this.emojiSelectEvent.emit(emoji);
  }

  // @HostListener('document:click', ['$event.target'])
  // onClick(btn: any): void {
  //   if (this.visible) {
  //     this.visible = false;
  //   }
  // }

}
