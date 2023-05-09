import { Component, Input } from '@angular/core';
import { Photo } from '@modules/photos/store/photos/photo.model';
import { Observable } from "rxjs";

@Component({
  selector: 'app-photos-image-detail',
  templateUrl: './photos-image-detail.component.html',
  styleUrls: ['./photos-image-detail.component.scss']
})

export class PhotosImageDetailComponent {

  @Input()
  currentPhoto$: Observable<Photo>;

}
