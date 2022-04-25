import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {NgScrollbar} from 'ngx-scrollbar';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {getThumbUrl} from "@gallery/store/photos/photo.tools";

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

  images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);

  constructor(private store: Store) {
  }

  onSelectCurrentImage($event: MouseEvent, index: number): void {
    this.currentIndex = index;
    // const shiftKey = $event.shiftKey;
    this.selectEvent.emit({index, selection: []});
  }

  // TODO refactor to "scrollToIndex" without arg
  scrollTo(index: number): void {
    this.currentIndex = index;
    const position = index * 120;
    void this.scrollbarRef.scrollTo({
      top: position
    });
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }
}
