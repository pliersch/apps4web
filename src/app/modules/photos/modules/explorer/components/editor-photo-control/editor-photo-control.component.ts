import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@modules/photos/store/photos/photo.model";
import { getW300Url } from "@modules/photos/store/photos/photo.tools";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageFallbackDirective } from '../../../../../share/directives/image-fallback-directive';

@Component({
    selector: 'app-editor-photo-control',
    templateUrl: './editor-photo-control.component.html',
    styleUrls: ['./editor-photo-control.component.scss'],
    standalone: true,
    imports: [ImageFallbackDirective, MatIconModule, MatButtonModule]
})
export class EditorPhotoControlComponent {

  @Input()
  photo: Photo;

  // @Input()
  // index: number;

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
