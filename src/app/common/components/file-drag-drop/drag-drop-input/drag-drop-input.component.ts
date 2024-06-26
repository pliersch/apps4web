import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HTMLInputEvent } from "@modules/chat/components/input/chat-input.component";
import { DragDropDirective } from '../drag-drop.directive';

@Component({
  selector: 'app-drag-drop-input',
  templateUrl: './drag-drop-input.component.html',
  styleUrls: ['./drag-drop-input.component.scss'],
  standalone: true,
  imports: [DragDropDirective, MatButtonModule]
})
export class DragDropInputComponent {

  @ViewChild('fileInput')
  input!: ElementRef;

  @Input()
  fileTypes: string[] = [];

  @Output()
  fileChangeEvent = new EventEmitter<File[]>();

  files: File[] = [];

  constructor(private renderer: Renderer2) {}

  onFileDropped(fileList: FileList): void {
    this.prepareFilesList(fileList);
  }

  fileBrowseHandler($event: Event): void {
    const e = <HTMLInputEvent>$event;
    if (e.target && e.target.files) {
      this.prepareFilesList(e.target.files);
    }
  }

  deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number): void {
    // setTimeout(() => {
    //   if (index === this.files.length) {
    //     return;
    //   } else {
    //     const progressInterval = setInterval(() => {
    //       if (this.files[index].progress === 100) {
    //         clearInterval(progressInterval);
    //         this.uploadFilesSimulator(index + 1);
    //       } else {
    //         this.files[index].progress += 5;
    //       }
    //     }, 200);
    //   }
    // }, 1000);
  }

  prepareFilesList(files: FileList): void {
    let file: File;
    for (let i = 0; i < files.length; i++) {
      file = files.item(i)!;
      if (!this.files.includes(file)) {
        this.files.push(file);
      }
    }
    this.uploadFilesSimulator(0);
    this.fileChangeEvent.emit(this.files);
  }

  // formatBytes(bytes: number, decimals?: number): string {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   decimals = decimals || 2
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

  onClickBrowse(): void {
    this.renderer.selectRootElement(this.input.nativeElement).click();
  }
}
