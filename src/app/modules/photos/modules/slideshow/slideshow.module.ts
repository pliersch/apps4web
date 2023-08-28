import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotosSlideshowComponent } from "@modules/photos/modules/slideshow/pages/photos-slideshow.component";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";

import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SlideShowControlBarComponent } from './components/controlbar/slide-show-control-bar.component';

import { SlideshowRoutingModule } from './slideshow-routing.module';


@NgModule({
    imports: [
    CommonModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    SlideshowRoutingModule,
    PhotosSlideshowComponent,
    SlideShowControlBarComponent,
]
})
export class SlideshowModule {}
