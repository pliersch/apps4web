import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-star-rating',
  templateUrl: './gallery-star-rating.component.html',
  styleUrls: ['./gallery-star-rating.component.scss']
})
export class GalleryStarRatingComponent {

  @Input()
  rate = 1;

  @Output()
  rateChangeEvent = new EventEmitter<number>();

  onClickStar(rate: number): void {
    this.rateChangeEvent.emit(rate);
  }
}
