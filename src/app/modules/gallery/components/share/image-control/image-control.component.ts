import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getThumbUrl } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss']
})
export class ImageControlComponent {

  @Input()
  photo: Photo;

  @Input()
  selected: boolean;

  @Input()
  download: boolean;

  @Output()
  downloadEvent = new EventEmitter<Photo>();

  @Output()
  previewEvent = new EventEmitter<Photo>();

  onClickDownload(): void {
    this.downloadEvent.emit(this.photo);
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }

  onClickPreview(): void {
    this.previewEvent.emit(this.photo);
  }
}
