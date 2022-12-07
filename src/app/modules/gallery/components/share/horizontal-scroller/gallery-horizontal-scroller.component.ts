import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { SetCurrentPhoto } from "@gallery/store/photos/photo.actions";
import { ScrollerItemComponent } from "@gallery/components/share/scroller-item/scroller-item.component";

@Component({
  selector: 'app-gallery-horizontal-scroller',
  templateUrl: './gallery-horizontal-scroller.component.html',
  styleUrls: ['./gallery-horizontal-scroller.component.scss']
})
export class GalleryHorizontalScrollerComponent implements OnInit {

  @ViewChild(NgScrollbar)
  scrollbar!: NgScrollbar;

  @Select(PhotoState.getFilteredPhotos)
  photos$: Observable<Photo[]>

  @Select(PhotoState.getComparePhotos)
  comparePhotos$: Observable<Photo[]>

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  @Output()
  selectEvent = new EventEmitter<Photo>();

  private currentItem: ScrollerItemComponent;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
    });
  }

  onItemSelect($event: ScrollerItemComponent): void {
    if (this.currentItem) {
      this.currentItem.active = false;
    }
    this.currentItem = $event;
    this.currentItem.active = true;
    this.store.dispatch(new SetCurrentPhoto($event.photo));
    this.selectEvent.emit($event.photo);
  }

  // isCompared(photo: Photo): Observable<boolean> {
  //   console.log('GalleryHorizontalScrollerComponent isCompared: ',)
  //   return this.comparePhotos$.pipe(
  //     map(photos => photos.includes(photo))
  //   );
  // }

  onScroll($event: WheelEvent): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    if ($event.deltaY > 0) {
      this.scrollToPosition(scrollLeft + 450);
    } else {
      this.scrollToPosition(scrollLeft - 450);
    }
    $event.preventDefault();
  }

  scrollToIndex(index: number): void {
    void this.scrollbar.scrollTo({
      left: index * 150
    });
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }
}
