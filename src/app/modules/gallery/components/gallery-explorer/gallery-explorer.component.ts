import {Component, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {EventBusService} from '@app/services/event-bus.service';
import {PhotoState} from "@gallery/store/photos/photo-state";

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit {

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>;

  currentImage!: Photo;
  showFilter = true;

  constructor(private store: Store,
              private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.eventBus.on('filterPhotos', () => {
      this.showFilter = !this.showFilter;
    });
  }
}
