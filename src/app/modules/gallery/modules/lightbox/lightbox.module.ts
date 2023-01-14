import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryLightboxComponent } from "@gallery/modules/lightbox/pages/gallery-lightbox.component";
import { LightBoxRoutingModule } from "@gallery/modules/lightbox/light-box-routing.module";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";
import { GalleryModule } from "@gallery/gallery.module";
import {
  GalleryImageGridComponent
} from "@gallery/modules/lightbox/components/image-grid/gallery-image-grid.component";
import { ShareModule } from "@modules/share/share.module";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    GalleryLightboxComponent,
    GalleryImageGridComponent,
  ],
  imports: [
    CommonModule,
    LightBoxRoutingModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    GalleryShareModule,
    GalleryModule,
    ShareModule,
  ]
})
export class LightboxModule {}
