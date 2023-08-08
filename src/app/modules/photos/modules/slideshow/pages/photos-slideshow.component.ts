import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PhotosHorizontalScrollerComponent } from "@modules/photos/core";
import { SetNextPhoto, SetPreviousPhoto } from "@modules/photos/store/photos/photo.actions";
import { Photo } from "@modules/photos/store/photos/photo.model";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { getPhotoUrl } from "@modules/photos/store/photos/photo.tools";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-photos-slideshow',
  templateUrl: './photos-slideshow.component.html',
  styleUrls: ['./photos-slideshow.component.scss']
})
export class PhotosSlideshowComponent implements OnInit, OnDestroy {

  @ViewChild(PhotosHorizontalScrollerComponent)
  scroller!: PhotosHorizontalScrollerComponent;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nextSlide(): void {
    this.store.dispatch(new SetNextPhoto())
  }

  prevSlide(): void {
    this.store.dispatch(new SetPreviousPhoto())
  }

}
