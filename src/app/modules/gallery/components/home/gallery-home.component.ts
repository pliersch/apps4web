import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Photo } from '@gallery/store/photos/photo.model';
import { getPhotoUrl, getPreviewUrl, getThumbUrl } from "@gallery/store/photos/photo.tools";
import { PhotoState } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent {

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

  // constructor(private store: Store) {
  // }

  getPhotoUrl(fileName: string): string {
    return getPhotoUrl(fileName);
  }

  getPreviewUrl(fileName: string): string {
    return getPreviewUrl(fileName);
  }

  getThumbUrl(fileName: string): string {
    return getThumbUrl(fileName);
  }

}
