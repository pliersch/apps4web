import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getThumbUrl } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-image-control2',
  templateUrl: './image-control2.component.html',
  styleUrls: ['./image-control2.component.scss']
})
export class ImageControl2Component {

  @Input()
  photo: Photo;

  @Input()
  selected: boolean;

  @Input()
  edit: boolean;

  @Input()
  hasRights: boolean;

  @Output()
  editEvent = new EventEmitter<Photo>();

  @Output()
  groupEditEvent = new EventEmitter<Photo>();

  @Output()
  deleteEvent = new EventEmitter<Photo>();

  @Output()
  previewEvent = new EventEmitter<Photo>();


  onClickGroupEdit(): void {
    this.groupEditEvent.emit(this.photo);
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }

  onClickEdit(): void {
    this.editEvent.emit(this.photo);
  }

  onClickDelete(): void {
    this.deleteEvent.emit(this.photo);
  }

  onClickPreview(): void {
    this.previewEvent.emit(this.photo);
  }
}
