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


@NgModule({
  declarations: [
    GalleryHorizontalScrollerComponent,
    GalleryVerticalScrollerComponent,
    ScrollerItemComponent,
    GalleryImagePlaceholderComponent,
    GalleryStarRatingComponent,
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
  ]
})
export class GalleryShareModule {}
