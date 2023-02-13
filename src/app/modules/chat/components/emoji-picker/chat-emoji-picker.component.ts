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
  show: boolean = false;

  emojis: Emoji[] = [];

  // mixins: [escapeMixin],

  constructor() {
  }

  ngOnInit(): void {
    this.emojis = emoji.emojis
  }

  onEmojiClick(emoji: Emoji): void {
    this.emojiSelectEvent.emit(emoji);
  }

  handleEscape(): void {
    // this.close()
    //  this.$emit('close')
  }

  //   mounted() {
  //   document.addEventListener('keyup', this.onEscape)
  // },
  // beforeDestroy() {
  //   document.removeEventListener('keyup', this.onEscape)
  // },
  // methods: {
  //   onEscape(event) {
  //     if (event.defaultPrevented) {
  //       return
  //     }
  //     const key = event.key || event.keyCode
  //     if (key === 'Escape' || key === 'Esc' || key === 27) {
  //       this.handleEscape()
  //     }
  //   }
  // }
}