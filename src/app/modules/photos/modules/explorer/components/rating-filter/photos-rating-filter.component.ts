import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-photos-rating-filter',
  templateUrl: './photos-rating-filter.component.html',
  styleUrls: ['./photos-rating-filter.component.scss']
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
