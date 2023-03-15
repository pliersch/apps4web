import { Component } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent {

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

}
