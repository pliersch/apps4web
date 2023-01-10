import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";
import { SetRating } from "@gallery/store/photos/photo.actions";

@Component({
  selector: 'app-gallery-rating',
  templateUrl: './gallery-rating.component.html',
  styleUrls: ['./gallery-rating.component.scss']
})
export class GalleryRatingComponent implements OnInit {

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;
  currentPhoto: Photo;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentPhoto$.subscribe(res => {
      this.currentPhoto = res;
    });
  }

  onRateChange(rate: number): void {
    this.store.dispatch(new SetRating(this.currentPhoto, rate));
  }

}
