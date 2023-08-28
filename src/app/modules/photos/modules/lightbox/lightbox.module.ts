import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PhotosImageGridComponent
} from "@modules/photos/modules/lightbox/components/image-grid/photos-image-grid.component";
import { LightBoxRoutingModule } from "@modules/photos/modules/lightbox/light-box-routing.module";
import { PhotosLightboxComponent } from "@modules/photos/modules/lightbox/pages/photos-lightbox.component";

import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";


import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
    imports: [
    CommonModule,
    LightBoxRoutingModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    PhotosLightboxComponent,
    PhotosImageGridComponent,
]
})
export class LightboxModule {}
