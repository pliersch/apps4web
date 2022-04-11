import {Component} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {PhotoState} from "@gallery/store/photos/photo-state";

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent {

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>;

  currentImage: Photo;
  showFilter = true;

  constructor() {
  }

  // ngOnInit(): void {
  //   // this.eventBus.on('filterPhotos', () => {
  //   //   this.showFilter = !this.showFilter;
  //   // });
  // }
  setCurrent(image: Photo): void {
    this.currentImage = image;
  }
}
