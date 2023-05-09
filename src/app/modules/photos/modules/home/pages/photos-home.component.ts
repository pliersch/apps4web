import { Component } from '@angular/core';
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos-home',
  templateUrl: './photos-home.component.html',
  styleUrls: ['./photos-home.component.scss']
})
export class PhotosHomeComponent {

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

}
