import { Component, Input } from '@angular/core';
import { Photo } from "@modules/photos/store/photos/photo.model";
import { Observable } from "rxjs";
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { StarRatingComponent } from '../../../share/components/star-rating/star-rating.component';

@Component({
    selector: 'app-slide-show-control-bar',
    templateUrl: './slide-show-control-bar.component.html',
    styleUrls: ['./slide-show-control-bar.component.scss'],
    standalone: true,
    imports: [StarRatingComponent, MatChipsModule, NgFor, AsyncPipe, DatePipe]
})
export class SlideShowControlBarComponent {

  @Input()
  photo$: Observable<Photo>;
}
