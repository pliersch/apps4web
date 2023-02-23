import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from "@gallery/modules/home/home-routing.module";
import { GalleryHomeComponent } from "@gallery/modules/home/pages/gallery-home.component";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { ShareModule } from "@modules/share";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    GalleryHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    ShareModule,
  ]
})
export class HomeModule {}
