import {Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {
  GalleryVerticalScrollerComponent
} from '@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component';
import {
  GalleryHorizontalScrollerComponent
} from '@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component';
import {EventBusService} from '@app/services/event-bus.service';
import {AlertService} from '@app/services/alert.service';
import {Photo} from '@gallery/store/photos/photo.model';
import {LoadPhotosAction} from "@gallery/store/photos/photo-actions";
import {PhotoState} from "@gallery/store/photos/photo-state";

enum View {
  Horizontal = 1,
  Vertical = 2
}

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent implements OnInit {

  @ViewChild(GalleryVerticalScrollerComponent)
  verticalScrollbarRef!: GalleryVerticalScrollerComponent;

  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  @Select(PhotoState.getPhotos)
  images: Observable<Photo>

  @Select(PhotoState.getSelectedPhotos)
  selectedPhotos: Observable<Photo>

  viewEnum = View;
  // images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);
  view = View.Horizontal;
  index = 0;

  constructor(
    private alertService: AlertService,
    private eventBus: EventBusService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPhotosAction());
    this.eventBus.on('switchView', () => {
      this.switchView();
    });
  }

  switchView(): void {
    this.view = this.view === View.Horizontal ? View.Vertical : View.Horizontal;
  }

  onSelectImage(event: { index: number, selection: Photo[] }): void {
    this.index = event.index;
  }

  nextSlide(): void {
    this.updateSlideIndex(1);
  }

  prevSlide(): void {
    this.updateSlideIndex(-1);
  }

  updateSlideIndex(n: number): void {
    this.index += n;
    this.scrollToActiveItem();
  }

  private scrollToActiveItem(): void {
    if (this.view === View.Horizontal) {
      // this.horizontalScrollbarRef.scrollTo(this.index);
    } else {
      this.verticalScrollbarRef.scrollTo(this.index);
    }
  }
}
