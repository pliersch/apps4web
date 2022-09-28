import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { SetRatingFilter } from "@gallery/store/photos/photo.actions";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-gallery-rating-filter',
  templateUrl: './gallery-rating-filter.component.html',
  styleUrls: ['./gallery-rating-filter.component.scss']
})
export class GalleryRatingFilterComponent implements OnInit {

  @Select(PhotoState.getFilterRating)
  currentRating$: Observable<number>;
  // TODO workaround to show 'star-rating' with '0' stars. see comment in template
  currentRating: number;

  constructor(private store: Store) { }

  onRateChange(rate: number): void {
    this.store.dispatch(new SetRatingFilter(rate));
  }

  ngOnInit(): void {
    this.currentRating$.subscribe((rate) => this.currentRating = rate);
  }

}
