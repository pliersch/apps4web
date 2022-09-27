import { Component } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { SetRatingFilter } from "@gallery/store/photos/photo.actions";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-gallery-rating-filter',
  templateUrl: './gallery-rating-filter.component.html',
  styleUrls: ['./gallery-rating-filter.component.scss']
})
export class GalleryRatingFilterComponent {

  @Select(PhotoState.getFilterRating)
  currentRating$: Observable<number>;

  constructor(private store: Store) { }

  onRateChange(rate: number): void {
    this.store.dispatch(new SetRatingFilter(rate));
  }

}
