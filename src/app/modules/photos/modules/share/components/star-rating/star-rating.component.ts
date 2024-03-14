import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
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
