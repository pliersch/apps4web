import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Photo } from '@gallery/store/photos/photo.model';
import { getW300Url, getW600Url, getW900Url } from "@gallery/store/photos/photo.tools";
import { PhotoState } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent {

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

  getPhotoUrl(fileName: string): string {
    return getW900Url(fileName);
  }

  getPreviewUrl(fileName: string): string {
    return getW600Url(fileName);
  }

  getThumbUrl(fileName: string): string {
    return getW300Url(fileName);
  }

}