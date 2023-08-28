import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarRatingComponent } from '../../../share/components/star-rating/star-rating.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-photos-rating-filter',
    templateUrl: './photos-rating-filter.component.html',
    styleUrls: ['./photos-rating-filter.component.scss'],
    standalone: true,
    imports: [MatCardModule, StarRatingComponent]
})
export class PhotosRatingFilterComponent {

  @Input()
  currentRating = 0;

  @Output()
  changeRatingEvent = new EventEmitter<number>();

  onRateChange(rate: number): void {
    this.changeRatingEvent.emit(rate);
  }

}
