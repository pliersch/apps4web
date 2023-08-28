import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ScrollerItemComponent } from "@modules/photos/modules/share/components/scroller-item/scroller-item.component";
import { SetCurrentPhoto } from "@modules/photos/store/photos/photo.actions";
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select, Store } from '@ngxs/store';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable, Subscription } from 'rxjs';
import { ScrollerItemComponent as ScrollerItemComponent_1 } from '../scroller-item/scroller-item.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-photos-horizontal-scroller',
    templateUrl: './photos-horizontal-scroller.component.html',
    styleUrls: ['./photos-horizontal-scroller.component.scss'],
    standalone: true,
    imports: [NgScrollbar, NgFor, ScrollerItemComponent_1, AsyncPipe]
})
export class PhotosHorizontalScrollerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NgScrollbar)
  scrollbar!: NgScrollbar;

  @Select(PhotoState.getFilteredPhotos)
  photos$: Observable<Photo[]>

  @Select(PhotoState.getComparePhotos)
  comparePhotos$: Observable<Photo[]>

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;
  lastIndex: number;

  @Output()
  selectEvent = new EventEmitter<Photo>();

  private readonly ITEM_WIDTH = 150;
  private readonly STEPS = 3;

  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // not possible inside afterViewInit, expressionChange error is throwing
    this.subscription =
      this.currentIndex$.subscribe(res => {
        this.lastIndex = this.currentIndex;
        this.currentIndex = res;
      });
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.currentIndex$.subscribe(res => {
        this.scrollToActiveItem();
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onItemSelect($event: ScrollerItemComponent): void {
    this.store.dispatch(new SetCurrentPhoto($event.photo));
    this.selectEvent.emit($event.photo);
  }

  onScroll($event: WheelEvent): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    const diff = this.ITEM_WIDTH * this.STEPS;
    if ($event.deltaY > 0) {
      this.scrollToPosition(scrollLeft + diff);
    } else {
      this.scrollToPosition(scrollLeft - diff);
    }
    $event.preventDefault();
  }

  scrollToActiveItem(): void {
    this.currentIndex > this.lastIndex ?
      this.scrollRight() :
      this.scrollLeft();
  }

  scrollRight(): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    const width = this.scrollbar.nativeElement.clientWidth;
    const position = (this.currentIndex + 1) * this.ITEM_WIDTH;
    const diff = position - width;
    if (position > width + scrollLeft) {
      void this.scrollbar.scrollTo({
        left: diff,
        duration: 0
      });
    }
  }

  scrollLeft(): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    const position = this.currentIndex * this.ITEM_WIDTH;
    if (position < scrollLeft) {
      void this.scrollbar.scrollTo({
        left: position,
        duration: 0
      });
    }
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }
}
