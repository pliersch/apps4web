import { Component, OnInit } from '@angular/core';
import { SetRating } from "@modules/photos/store/photos/photo.actions";
import { Photo } from "@modules/photos/store/photos/photo.model";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-photos-rating',
  templateUrl: './photos-rating.component.html',
  styleUrls: ['./photos-rating.component.scss']
})
export class PhotosRatingComponent implements OnInit {

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
