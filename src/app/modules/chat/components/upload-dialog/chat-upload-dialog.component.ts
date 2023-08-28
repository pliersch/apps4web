import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropInputComponent } from '../../../share/file-drag-drop/drag-drop-input/drag-drop-input.component';

export interface Attachment {
  comment: string;
  pictures: File[];
}

@Component({
    selector: 'app-chat-upload-dialog',
    templateUrl: './chat-upload-dialog.component.html',
    styleUrls: ['./chat-upload-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, DragDropInputComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule]
})
export class ChatUploadDialogComponent {

  files: File[] = [];
  images: string[] = [];
  comment = '';

  constructor(
    public dialogRef: MatDialogRef<ChatUploadDialogComponent>) {
  }

  onClickSend(): void {
    const attachment: Attachment = {
      comment: this.comment,
      pictures: this.files
    }
    this.dialogRef.close(attachment);
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

  onFilesChange(files: File[]): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (this.files.includes(file)) {
        continue;
      }
      this.files.push(file);

      // TODO show warning
      const imageType = /^image\//
      if (!imageType.test(file.type)) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any): void => {
        this.images.push(e.target.result)
      };
      reader.onerror = (e: any): void => {
        console.log('File could not be read: ' + reader.error!.code);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("thumbnail", file);
    }
  }

}
