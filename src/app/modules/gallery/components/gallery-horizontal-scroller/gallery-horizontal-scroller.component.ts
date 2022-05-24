import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TogglePhotoSelectionAction } from "@gallery/store/photos/photo.actions";
import { getThumbUrl } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-gallery-horizontal-scroller',
  templateUrl: './gallery-horizontal-scroller.component.html',
  styleUrls: ['./gallery-horizontal-scroller.component.scss']
})
export class GalleryHorizontalScrollerComponent implements OnInit {

  @ViewChild(NgScrollbar)
  scrollbar!: NgScrollbar;

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>

  @Select(PhotoState.getComparePhotos)
  images2: Observable<Photo[]>

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
    });
  }

  onSelectImage(photo: Photo): void {
    this.updateSelection(photo);
  }

  onScroll($event: WheelEvent): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    if ($event.deltaY > 0) {
      this.scrollToPosition(scrollLeft + 400);
    } else {
      this.scrollToPosition(scrollLeft - 400);
    }
    $event.preventDefault();
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }

  private updateSelection(photo: Photo): void {
    this.store.dispatch(new TogglePhotoSelectionAction(photo));
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }
}
