import { Component, ViewChild } from '@angular/core';
import { AlertService } from '@app/common/services/alert.service';
import { GalleryHorizontalScrollerComponent } from '@gallery/core';
import { TogglePhotoComparison } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent {

  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  constructor(private alertService: AlertService,
              private store: Store) {
  }

  onSelectImage(photo: Photo): void {
    this.store.dispatch(new TogglePhotoComparison(photo));
  }

}
