import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideshowRoutingModule } from './slideshow-routing.module';
import { GallerySlideshowComponent } from "@gallery/modules/slideshow/pages/gallery-slideshow.component";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    GallerySlideshowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    GalleryShareModule,
    SlideshowRoutingModule,
  ]
})
export class SlideshowModule {}
