import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { allPhotos } from '@gallery/store/photos/photo.selectors';
import { Store } from '@ngrx/store';
import { PhotoState } from '@gallery/store/photos/photo.state';

@Component({
  selector: 'app-gallery-vertical-scroller',
  templateUrl: './gallery-vertical-scroller.component.html',
  styleUrls: ['./gallery-vertical-scroller.component.scss']
})
export class GalleryVerticalScrollerComponent {

  @ViewChild(NgScrollbar)
  scrollbarRef!: NgScrollbar;

  @Input() currentIndex = 0;
  @Output() selectEvent = new EventEmitter<{ index: number, selection: Photo[] }>();

  images: Observable<Photo[]> = this.store.select(allPhotos);

  constructor(private store: Store<PhotoState>) {
  }

  onSelectCurrentImage($event: MouseEvent, index: number): void {
    this.currentIndex = index;
    // const shiftKey = $event.shiftKey;
    this.selectEvent.emit({ index, selection: [] });
  }

  // TODO refactor to "scrollToIndex" without arg
  scrollTo(index: number): void {
    this.currentIndex = index;
    const position = index * 120;
    void this.scrollbarRef.scrollTo({
      top: position
    });
  }
}
