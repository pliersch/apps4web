import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getW300Url } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-scroller-item',
  templateUrl: './scroller-item.component.html',
  styleUrls: ['./scroller-item.component.scss']
})
export class ScrollerItemComponent implements OnInit {

  @Input()
  photo: Photo;

  @Input()
  active: boolean;

  @Output()
  selectEvent = new EventEmitter<ScrollerItemComponent>();

  imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = getW300Url(this.photo.fileName);
  }

  onClickImage(): void {
    this.selectEvent.emit(this);
  }
}
