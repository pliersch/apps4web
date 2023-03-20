import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GalleryHorizontalScrollerComponent } from '@gallery/core';
import { TogglePhotoComparison } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent implements AfterViewInit {

  @ViewChild(GalleryHorizontalScrollerComponent)
  scroller!: GalleryHorizontalScrollerComponent;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    this.currentIndex$.pipe(take(1)).subscribe(res => {
      this.currentIndex = res;
      this.scrollToActiveItem();
    })
  }

  onSelectImage(photo: Photo): void {
    this.store.dispatch(new TogglePhotoComparison(photo));
  }

  private scrollToActiveItem(): void {
    this.scroller.scrollToIndex(this.currentIndex);
  }

}
