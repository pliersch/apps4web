import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-rating-filter',
  templateUrl: './gallery-rating-filter.component.html',
  styleUrls: ['./gallery-rating-filter.component.scss']
})
export class GalleryRatingFilterComponent {

  @Input()
  currentRating = 0;

  @Output()
  changeRatingEvent = new EventEmitter<number>();

  onRateChange(rate: number): void {
    this.changeRatingEvent.emit(rate);
  }

}
