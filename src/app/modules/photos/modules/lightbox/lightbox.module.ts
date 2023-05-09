import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PhotosImageGridComponent
} from "@modules/photos/modules/lightbox/components/image-grid/photos-image-grid.component";
import { LightBoxRoutingModule } from "@modules/photos/modules/lightbox/light-box-routing.module";
import { PhotosLightboxComponent } from "@modules/photos/modules/lightbox/pages/photos-lightbox.component";
import { PhotosShareModule } from "@modules/photos/modules/share/photos-share.module";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { MaterialModule } from "@modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    PhotosLightboxComponent,
    PhotosImageGridComponent,
  ],
  imports: [
    CommonModule,
    LightBoxRoutingModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    PhotosShareModule,
    ShareModule,
  ]
})
export class LightboxModule {}
