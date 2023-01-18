import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GalleryHorizontalScrollerComponent
} from "@gallery/modules/share/horizontal-scroller/gallery-horizontal-scroller.component";
import { GalleryStarRatingComponent } from "@gallery/modules/share/star-rating/gallery-star-rating.component";
import {
  GalleryVerticalScrollerComponent
} from "@gallery/modules/share/vertical-scroller/gallery-vertical-scroller.component";
import { ScrollerItemComponent } from "@gallery/modules/share/scroller-item/scroller-item.component";
import {
  GalleryImagePlaceholderComponent
} from "@gallery/modules/share/image-placeholder/gallery-image-placeholder.component";
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
