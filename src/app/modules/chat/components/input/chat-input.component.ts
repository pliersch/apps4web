import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Emoji } from "@modules/chat/store/chat.model";

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})

export class ChatInputComponent {

  @Output()
  toggleTmpEvent = new EventEmitter<boolean>();
  @Output()
  messageEvent = new EventEmitter<string>();
  @Output()
  fileChangeEvent = new EventEmitter<FileList>();

  content = '';
  emojiPanel = false;
  visible = false;
  fileName: string;

  emitMessage(): void {
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && event.ctrlKey) {
      this.emitMessage();
    }
  }

  appendFile($event: Event): void {
    const e = <HTMLInputEvent>$event;
    if (e.target && e.target.files) {
      this.fileChangeEvent.emit(e.target.files);
    }
  }

  onFileInputChange(): void {
    // this.fileChangeEvent.emit(this.$refs.fileInput.files);
  }

  reset(): void {
    // this.$refs.form.reset()
  }

  toggleUpload(): void {
    this.toggleTmpEvent.emit(this.visible);
    this.visible = !this.visible;
  }
}
