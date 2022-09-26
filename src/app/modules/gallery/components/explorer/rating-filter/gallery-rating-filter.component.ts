import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";
import { SetRating } from "@gallery/store/photos/photo.actions";

@Component({
  selector: 'app-gallery-rating-filter',
  templateUrl: './gallery-rating-filter.component.html',
  styleUrls: ['./gallery-rating-filter.component.scss']
})
export class GalleryRatingFilterComponent implements OnInit {

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

  onClickStar(rate: number): void {
    this.store.dispatch(new SetRating(this.currentPhoto, rate));
  }

}
