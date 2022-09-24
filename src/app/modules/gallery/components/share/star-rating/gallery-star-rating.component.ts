import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";
import { SetRating } from "@gallery/store/photos/photo.actions";

@Component({
  selector: 'app-gallery-star-rating',
  templateUrl: './gallery-star-rating.component.html',
  styleUrls: ['./gallery-star-rating.component.scss']
})
export class GalleryStarRatingComponent implements OnInit {

  @ViewChild('star1')
  star1!: ElementRef;

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;
  currentPhoto: Photo;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.currentPhoto$.subscribe(res => {
      this.currentPhoto = res;
      // if (res?.rating) {
      //   // res.rating
      //   // console.log('GalleryStarRatingComponent : ', this.star1.nativeElement)
      // }
      // console.log('GalleryStarRatingComponent : ', res?.rating)
    });
  }

  onClickStar(rate: number): void {
    this.store.dispatch(new SetRating(this.currentPhoto, rate));
  }
}
