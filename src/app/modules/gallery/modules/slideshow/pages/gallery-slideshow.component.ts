import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  GalleryVerticalScrollerComponent
} from "@gallery/modules/share/vertical-scroller/gallery-vertical-scroller.component";
import { Select, Store } from "@ngxs/store";
import { SetNextPhoto, SetPreviousPhoto } from "@gallery/store/photos/photo.actions";
import {
  GalleryHorizontalScrollerComponent
} from "@gallery/modules/share/horizontal-scroller/gallery-horizontal-scroller.component";
import { getPhotoUrl } from "@gallery/store/photos/photo.tools";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable, Subscription } from "rxjs";
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
export class GallerySlideshowComponent implements OnInit, AfterViewInit, OnDestroy {

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
  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscription =
      this.currentPhoto$.subscribe(res => {
        if (res) {
          this.imgUrl = getPhotoUrl(res.fileName);
        }
      });
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.currentIndex$.subscribe(res => {
        this.currentIndex = res;
        this.scrollToActiveItem();
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nextSlide(): void {
    this.store.dispatch(new SetNextPhoto())
  }

  prevSlide(): void {
    this.store.dispatch(new SetPreviousPhoto())
  }

  private scrollToActiveItem(): void {
    if (this.view === View.Horizontal) {
      this.horizontalScrollbarRef.scrollToIndex(this.currentIndex);
    } else {
      this.verticalScrollbarRef.scrollTo(this.currentIndex);
    }
  }

}
