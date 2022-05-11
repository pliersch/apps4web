import {Component, EventEmitter, Output} from '@angular/core';
import {ChatImage} from "@modules/chat/models/chat-image";

@Component({
  selector: 'app-chat-upload',
  templateUrl: './chat-upload.component.html',
  styleUrls: ['./chat-upload.component.scss']
})
export class ChatUploadComponent {

  @Output()
  closeUploadEvent = new EventEmitter<never>();

  @Output()
  previewMountedEvent = new EventEmitter<never>();

  @Output()
  uploadEvent = new EventEmitter<ChatImage>();

  files: File[] = [];
  images: string[] = [];

  constructor() {
  }

  closePreview(): void {
    this.closeUploadEvent.emit();
  }

  onUploadClicked(): void {
    const msg = {
      comment: 'content',
      images: this.files
    }
    this.uploadEvent.emit(msg);
  }

  onFilesChange(files: File[]): void {
    for (let i = 0; i < files.length; i++) {
      const anotherFile = files[i]
      if (this.files.includes(anotherFile)) {
        continue;
      }
      this.files.push(anotherFile);
      console.log(this.files)

      // TODO show warning
      const imageType = /^image\//
      if (!imageType.test(anotherFile.type)) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any): void => {
        this.images.push(e.target.result)
      };
      reader.onerror = (e: any): void => {
        console.log('File could not be read: ' + reader.error!.code);
      };
      reader.readAsDataURL(anotherFile);

      const formData = new FormData();
      formData.append("thumbnail", anotherFile);
    }
  }

  onSelectImage($event: MouseEvent, i: number): void {
    console.log('ChatUploadComponent onSelectImage: ')
  }
}
