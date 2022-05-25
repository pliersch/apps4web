import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryVerticalScrollerComponent }
  from "@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component";
import { Select, Store } from "@ngxs/store";
import {
  LoadPhotosAction,
  SetCurrentPhotoAction,
  SetNextPhotoAction,
  SetPreviousPhotoAction
} from "@gallery/store/photos/photo.actions";
import { GalleryHorizontalScrollerComponent }
  from "@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component";
import { getPhotoUrl } from "@gallery/store/photos/photo.tools";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";

enum View {
  Horizontal,
  Vertical
}

@Component({
  selector: 'app-gallery-slideshow',
  templateUrl: './gallery-slideshow.component.html',
  styleUrls: ['./gallery-slideshow.component.scss']
})
export class GallerySlideshowComponent implements OnInit {

  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  @ViewChild(GalleryVerticalScrollerComponent)
  verticalScrollbarRef!: GalleryVerticalScrollerComponent;

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  imgUrl = '';

  viewEnum = View;
  view = View.Horizontal;
  index = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.store.select(state => state.gallery);
    this.store.dispatch(new LoadPhotosAction(60));
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
    });
    this.currentPhoto$.subscribe(res => {
      if (res) {
        this.imgUrl = getPhotoUrl(res.fileName);
      }
    })
  }

  onSelectImage($event: Photo): void {
    this.store.dispatch(new SetCurrentPhotoAction($event))
  }

  nextSlide(): void {
    this.store.dispatch(new SetNextPhotoAction())
    this.updateSlideIndex(1);
  }

  prevSlide(): void {
    this.store.dispatch(new SetPreviousPhotoAction())
    this.updateSlideIndex(-1);
  }

  updateSlideIndex(n: number): void {
    this.index += n;
    this.scrollToActiveItem();
  }

  private scrollToActiveItem(): void {
    if (this.view === View.Horizontal) {
      this.horizontalScrollbarRef.scrollToPosition(this.index);
    } else {
      this.verticalScrollbarRef.scrollTo(this.index);
    }
  }

}
