import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getW300Url } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-editor-photo-control',
  templateUrl: './editor-photo-control.component.html',
  styleUrls: ['./editor-photo-control.component.scss']
})
export class EditorPhotoControlComponent {

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


  onClickGroupEdit($event: MouseEvent): void {
    $event.stopPropagation();
    this.groupEditEvent.emit(this.photo);
  }

  getThumbUrl(fileName: string): string {
    return getW300Url(fileName);
  }

  onClickEdit(): void {
    this.editEvent.emit(this.photo);
  }

  onClickDelete($event: MouseEvent): void {
    $event.stopPropagation();
    this.deleteEvent.emit(this.photo);
  }

  onClickPreview(): void {
    this.previewEvent.emit(this.photo);
  }
}