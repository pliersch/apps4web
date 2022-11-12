import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable, tap } from 'rxjs';
import { Select } from '@ngxs/store';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { getThumbUrl } from "@gallery/store/photos/photo.tools";
import { map } from "rxjs/operators";

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

  ngOnInit(): void {
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
    });
  }

  onSelectImage(photo: Photo): void {
    this.selectEvent.emit(photo);
  }

  isCompared(photo: Photo): Observable<boolean> {
    console.log('GalleryHorizontalScrollerComponent isCompared: ',)
    return this.comparePhotos$.pipe(
      map(photos => photos.includes(photo))
    );
  }

  onScroll($event: WheelEvent): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    if ($event.deltaY > 0) {
      this.scrollToPosition(scrollLeft + 600);
    } else {
      this.scrollToPosition(scrollLeft - 600);
    }
    $event.preventDefault();
  }

  scrollToIndex(index: number): void {
    void this.scrollbar.scrollTo({
      left: index * 200
    });
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }
}
