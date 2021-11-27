import {Component, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Store} from '@ngrx/store';
import {Store as XsStore} from '@ngxs/store';
import {PhotoState} from '@gallery/store/photos/photo.state';
import {Observable} from 'rxjs';
import {EventBusService} from '@app/services/event-bus.service';
import {LoadPhotosAction} from "@gallery/store/photos/photo-actions";

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit {

  images: Observable<Photo[]> = this.xsStore.select(state => state.gallery.photos);
  // images: Observable<Photo[]> = this.store.select(allPhotos);
  currentImage!: Photo;
  showFilter = true;

  constructor(private store: Store<PhotoState>,
              private xsStore: XsStore,
              private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    // this.xsStore.select()
    // this.xsStore.select(state => state.gallery.photos).subscribe((res) => {
    //   console.log("fuck 111!", res)
    // });
    this.xsStore.dispatch(new LoadPhotosAction()).subscribe((photos) => {
      this.currentImage = photos[0];
    });

    // this.store.dispatch(loadPhotos());
    // this.images.subscribe(photos => {
    //   this.currentImage = photos[0];
    // });
    this.eventBus.on('filterPhotos', () => {
      this.showFilter = !this.showFilter;
    });
  }
}
