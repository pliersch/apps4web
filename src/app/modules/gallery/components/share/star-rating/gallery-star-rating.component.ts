import { Component, OnInit } from '@angular/core';
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

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;
  currentPhoto: Photo;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.currentPhoto$.subscribe(res => {
      this.currentPhoto = res;
    });
  }

  onChangeRate(rate: number): void {
    this.store.dispatch(new SetRating(this.currentPhoto, rate));
  }
}
