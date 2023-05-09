import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ScrollerItemComponent } from "@modules/photos/modules/share/components/scroller-item/scroller-item.component";
import { SetCurrentPhoto } from "@modules/photos/store/photos/photo.actions";
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select, Store } from '@ngxs/store';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos-horizontal-scroller',
  templateUrl: './photos-horizontal-scroller.component.html',
  styleUrls: ['./photos-horizontal-scroller.component.scss']
})
export class PhotosHorizontalScrollerComponent implements OnInit {

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
      left: index * 150,
      duration: 0
    });
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }
}
