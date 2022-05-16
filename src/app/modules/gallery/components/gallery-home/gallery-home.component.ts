import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Photo } from '@gallery/store/photos/photo.model';
import { getPhotoUrl, getPreviewUrl, getThumbUrl } from "@gallery/store/photos/photo.tools";
import { LoadPhotosAction } from "@gallery/store/photos/photo.actions";
import { PageOptionsDto } from "@app/common/dto/page-options.dto";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent implements OnInit {

  images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPhotosAction(new PageOptionsDto(1, 30)));
  }

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
