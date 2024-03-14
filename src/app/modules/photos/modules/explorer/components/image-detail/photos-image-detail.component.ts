import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Photo } from '@modules/photos/store/photos/photo.model';
import { Observable } from "rxjs";
import { PhotosRatingComponent } from '../rating-panel/photos-rating.component';

@Component({
  selector: 'app-photos-image-detail',
  templateUrl: './photos-image-detail.component.html',
  styleUrls: ['./photos-image-detail.component.scss'],
  standalone: true,
  imports: [MatCardModule, NgIf, PhotosRatingComponent, MatChipsModule, NgFor, AsyncPipe, DatePipe]
})

export class PhotosImageDetailComponent {

  @Input()
  currentPhoto$: Observable<Photo>;

}
