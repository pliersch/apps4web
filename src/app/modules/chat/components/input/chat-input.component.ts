import { CdkTextareaAutosize, TextFieldModule } from "@angular/cdk/text-field";
import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { Emoji } from "@modules/chat/store/chat.model";
import { ChatEmojiPickerComponent } from "../emoji-picker/chat-emoji-picker.component";

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  standalone: true,
  imports: [ChatEmojiPickerComponent, MatButtonModule, MatIconModule, MatInputModule, TextFieldModule, ReactiveFormsModule, FormsModule, MatToolbarModule]
})

export class ChatInputComponent {

  @ViewChild('autosize')
  autosize: CdkTextareaAutosize;

  @Output()
  showUploadEvent = new EventEmitter();
  @Output()
  showSearchEvent = new EventEmitter();
  @Output()
  filterUserEvent = new EventEmitter<string>();
  @Output()
  messageEvent = new EventEmitter<string>();
  @Output()
  fileChangeEvent = new EventEmitter<FileList>();

  selected: UserIdentity;
  content = '';
  emojiPanel = false;

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

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && event.ctrlKey) {
      this.emitMessage();
    }
  }

  showUpload(): void {
    this.showUploadEvent.emit();
  }

  showSearch(): void {
    this.showSearchEvent.emit();
  }
}
