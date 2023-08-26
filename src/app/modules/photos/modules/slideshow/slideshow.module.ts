import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotosShareModule } from "@modules/photos/modules/share/photos-share.module";
import { PhotosSlideshowComponent } from "@modules/photos/modules/slideshow/pages/photos-slideshow.component";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SlideShowControlBarComponent } from './components/controlbar/slide-show-control-bar.component';

import { SlideshowRoutingModule } from './slideshow-routing.module';


@NgModule({
  declarations: [
    PhotosSlideshowComponent,
    SlideShowControlBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    PhotosShareModule,
    SlideshowRoutingModule,
  ]
})
export class SlideshowModule {}
