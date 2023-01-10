import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GalleryHorizontalScrollerComponent
} from "@gallery/modules/share/horizontal-scroller/gallery-horizontal-scroller.component";
import {
  GalleryVerticalScrollerComponent
} from "@gallery/modules/share/vertical-scroller/gallery-vertical-scroller.component";
import { NgxScrollbarModule } from "@modules/share/ngx-scrollbar/ngx-scrollbar.module";
import { ScrollerItemComponent } from "@gallery/modules/share/scroller-item/scroller-item.component";
import {
  GalleryImagePlaceholderComponent
} from "@gallery/modules/share/image-placeholder/gallery-image-placeholder.component";


@NgModule({
  declarations: [
    GalleryHorizontalScrollerComponent,
    GalleryVerticalScrollerComponent,
    ScrollerItemComponent,
    GalleryImagePlaceholderComponent,
  ],
  imports: [
    CommonModule,
    NgxScrollbarModule,
  ],
  exports: [
    GalleryHorizontalScrollerComponent,
    GalleryVerticalScrollerComponent,
  ]
})
export class GalleryShareModule {}
