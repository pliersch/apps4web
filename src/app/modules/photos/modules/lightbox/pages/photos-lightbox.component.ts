import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PhotosHorizontalScrollerComponent } from '@modules/photos/core';
import { TogglePhotoComparison } from "@modules/photos/store/photos/photo.actions";
import { Photo } from "@modules/photos/store/photos/photo.model";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { PhotosHorizontalScrollerComponent as PhotosHorizontalScrollerComponent_1 } from '../../share/components/horizontal-scroller/photos-horizontal-scroller.component';
import { PhotosImageGridComponent } from '../components/image-grid/photos-image-grid.component';

@Component({
    selector: 'app-photos-lightbox',
    templateUrl: './photos-lightbox.component.html',
    styleUrls: ['./photos-lightbox.component.scss'],
    standalone: true,
    imports: [PhotosImageGridComponent, PhotosHorizontalScrollerComponent_1]
})
export class PhotosLightboxComponent implements AfterViewInit {

  @ViewChild(PhotosHorizontalScrollerComponent)
  scroller!: PhotosHorizontalScrollerComponent;

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
    this.scroller.scrollToActiveItem();
  }

}
