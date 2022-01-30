import {Component, ViewChild} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {NgScrollbar} from 'ngx-scrollbar';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {ClearPhotoSelectionAction, TogglePhotoSelectionAction} from "@gallery/store/photos/photo-actions";

@Component({
  selector: 'app-gallery-horizontal-scroller',
  templateUrl: './gallery-horizontal-scroller.component.html',
  styleUrls: ['./gallery-horizontal-scroller.component.scss']
})
export class GalleryHorizontalScrollerComponent {

  @ViewChild(NgScrollbar)
  scrollbar!: NgScrollbar;

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>

  constructor(private store: Store) {
  }

  onSelectImage($event: MouseEvent, photo: Photo): void {
    if ($event.shiftKey) {
      this.updateSelection(photo);
    } else {
      this.reInitializeSelection(photo);
    }
  }

  onScroll($event: WheelEvent): void {
    const scrollLeft = this.scrollbar.viewport.scrollLeft;
    if ($event.deltaY > 0) {
      this.scrollToPosition(scrollLeft + 400);
    } else {
      this.scrollToPosition(scrollLeft - 400);
    }
    $event.preventDefault();
  }

  scrollToPosition(position: number): void {
    void this.scrollbar.scrollTo({
      left: position
    });
  }

  private updateSelection(photo: Photo): void {
    this.store.dispatch(new TogglePhotoSelectionAction(photo));
  }

  private reInitializeSelection(photo: Photo): void {
    this.store.dispatch(new ClearPhotoSelectionAction());
    this.store.dispatch(new TogglePhotoSelectionAction(photo));
  }
}
