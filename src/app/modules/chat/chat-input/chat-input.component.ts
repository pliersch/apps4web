import {Component, EventEmitter, Output} from '@angular/core';
import {Emoji} from "@modules/chat/models/emoji";

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

  @Output()
  messageEvent = new EventEmitter<string>();
  @Output()
  fileChangeEvent = new EventEmitter<string[]>();

  content = 'foo';
  emojiPanel = false;

  emitMessage(): void {
    console.log('ChatInputComponent onSubmit: ', this.content)
    this.messageEvent.emit(this.content);
    this.content = ''
  }

  addEmojiToMessage(emoji: Emoji): void {
    this.content += emoji.value
  }

  onClose(): void {
    this.emojiPanel = false
  }

  toggleEmojiPanel(): void {
    this.emojiPanel = !this.emojiPanel
  }

  appendFile(): void {
    // this.$refs.fileInput.click()
  }

  onFileInputChange(): void {
    // this.fileChangeEvent.emit(this.$refs.fileInput.files);
  }

  reset(): void {
    // this.$refs.form.reset()
  }
}
