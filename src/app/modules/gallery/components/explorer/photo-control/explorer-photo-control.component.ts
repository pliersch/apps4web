import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getThumbUrl } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-explorer-photo-control',
  templateUrl: './explorer-photo-control.component.html',
  styleUrls: ['./explorer-photo-control.component.scss']
})
export class ExplorerPhotoControlComponent {

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
