import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@modules/photos/store/photos/photo.model";
import { getW300Url } from "@modules/photos/store/photos/photo.tools";

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
    return getW300Url(fileName);
  }

  onClickPreview(): void {
    this.previewEvent.emit(this.photo);
  }
}
