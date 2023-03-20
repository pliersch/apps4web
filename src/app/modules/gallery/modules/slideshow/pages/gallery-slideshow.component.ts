import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GalleryHorizontalScrollerComponent } from "@gallery/core";
import { SetNextPhoto, SetPreviousPhoto } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { getPhotoUrl } from "@gallery/store/photos/photo.tools";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription, take } from "rxjs";

@Component({
  selector: 'app-gallery-slideshow',
  templateUrl: './gallery-slideshow.component.html',
  styleUrls: ['./gallery-slideshow.component.scss']
})
export class GallerySlideshowComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(GalleryHorizontalScrollerComponent)
  scroller!: GalleryHorizontalScrollerComponent;

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  imgUrl: string;

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
    this.currentIndex$.pipe(take(1)).subscribe(res => {
      this.currentIndex = res;
      this.scrollToActiveItem();
    })
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
    this.scroller.scrollToIndex(this.currentIndex);
  }

}
