import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input()
  rate = 0;

  @Output()
  rateChangeEvent = new EventEmitter<number>();

  onClickStar(rate: number): void {
    this.rateChangeEvent.emit(rate);
  }
}
