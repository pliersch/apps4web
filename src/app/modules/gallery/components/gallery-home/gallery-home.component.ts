import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Photo} from '@gallery/store/photos/photo.model';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent {

  images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);

  constructor(private store: Store) {
  }

}
