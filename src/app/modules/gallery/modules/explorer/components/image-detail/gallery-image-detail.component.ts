import { Component, Input } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Observable } from "rxjs";

@Component({
  selector: 'app-gallery-image-detail',
  templateUrl: './gallery-image-detail.component.html',
  styleUrls: ['./gallery-image-detail.component.scss']
})

export class GalleryImageDetailComponent {

  @Input()
  currentPhoto$: Observable<Photo>;

}
