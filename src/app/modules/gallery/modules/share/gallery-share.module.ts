import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  GalleryHorizontalScrollerComponent,
  GalleryImagePlaceholderComponent,
  GalleryStarRatingComponent,
  GalleryVerticalScrollerComponent,
  ScrollerItemComponent
} from "@gallery/modules/share";
import { MaterialModule } from "@modules/share";
import { NgScrollbarModule } from "ngx-scrollbar";
import { GallerySorterComponent } from '../explorer/components/sorter/gallery-sorter.component';


@NgModule({
  declarations: [
    GalleryHorizontalScrollerComponent,
    GalleryVerticalScrollerComponent,
    ScrollerItemComponent,
    GalleryImagePlaceholderComponent,
    GalleryStarRatingComponent,
    GallerySorterComponent,
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    MaterialModule,
  ],
  exports: [
    GalleryHorizontalScrollerComponent,
    GalleryVerticalScrollerComponent,
    GalleryStarRatingComponent,
    GallerySorterComponent,
  ]
})
export class GalleryShareModule {}
