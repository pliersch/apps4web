import {Component, ViewChild} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {NgScrollbar} from 'ngx-scrollbar';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {clearSelection} from '@gallery/store/photos/photo.actions';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {TogglePhotoSelectionAction} from "@gallery/store/photos/photo-actions";

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

  // images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);

  constructor(private store: Store) {
  }

  onSelectImage($event: MouseEvent, photo: Photo): void {
    if ($event.shiftKey) {
      // photo.isSelected = true;
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
    this.store.dispatch(clearSelection());
    this.store.dispatch(new TogglePhotoSelectionAction(photo));
  }
}
