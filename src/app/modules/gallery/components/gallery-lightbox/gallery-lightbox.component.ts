import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { GalleryVerticalScrollerComponent } from '@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component';
import { EventBusService } from '@app/services/event-bus.service';
import { GalleryHorizontalScrollerComponent } from '@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component';
import { AlertService } from '@app/services/alert.service';
import { loadPhotos } from '@gallery/store/photos/photo.actions';
import { Store } from '@ngrx/store';
import { PhotoState } from '@gallery/store/photos/photo.state';
import { Observable, of } from 'rxjs';
import { allPhotos } from '@gallery/store/photos/photo.selectors';

enum View {
  Horizontal = 1,
  Vertical
}

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent implements OnInit {

  // @ViewChild(CdkVirtualScrollViewport)
  // private readonly scrollRef: CdkVirtualScrollViewport;

  viewEnum = View;
  images: Observable<Photo[]> = this.store.select(allPhotos);
  view = View.Horizontal;
  index = 0;
  @ViewChild(GalleryVerticalScrollerComponent)
  verticalScrollbarRef!: GalleryVerticalScrollerComponent;
  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  constructor(
    private alertService: AlertService,
    private eventBus: EventBusService,
    private store: Store<PhotoState>) {
  }

  ngOnInit(): void {
    this.eventBus.on('switchView', () => {
      this.switchView();
    });
    this.store.dispatch(loadPhotos());
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
