import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getW300Url } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-scroller-item',
  templateUrl: './scroller-item.component.html',
  styleUrls: ['./scroller-item.component.scss']
})
export class ScrollerItemComponent {

  @Input()
  photo: Photo;

  @Input()
  active: boolean;

  @Output()
  selectEvent = new EventEmitter<ScrollerItemComponent>();

  onClickImage(): void {
    this.selectEvent.emit(this);
  }

  getThumbUrl(fileName: string): string {
    return getW300Url(fileName);
  }
}
