import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideshowRoutingModule } from './slideshow-routing.module';
import { GallerySlideshowComponent } from "@gallery/modules/slideshow/pages/gallery-slideshow.component";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxScrollbarModule } from "@modules/share/ngx-scrollbar/ngx-scrollbar.module";
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";


@NgModule({
  declarations: [
    GallerySlideshowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    GalleryShareModule,
    SlideshowRoutingModule,
  ]
})
export class SlideshowModule {}
