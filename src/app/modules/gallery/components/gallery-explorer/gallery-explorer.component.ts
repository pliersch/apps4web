import { Component, OnInit } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Store } from '@ngrx/store';
import { PhotoState } from '@gallery/store/photos/photo.state';
import { Observable } from 'rxjs';
import { allPhotos } from '@gallery/store/photos/photo.selectors';
import { loadPhotos } from '@gallery/store/photos/photo.actions';
import { EventBusService } from '@app/services/event-bus.service';

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit {

  images: Observable<Photo[]> = this.store.select(allPhotos);
  currentImage!: Photo;
  showFilter = true;

  constructor(private store: Store<PhotoState>,
              private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPhotos());
    this.images.subscribe(photos => {
      this.currentImage = photos[0];
    });
    this.eventBus.on('filterPhotos', () => {
      this.showFilter = !this.showFilter;
    });
  }
}
