import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { GalleryHomeComponent } from "@gallery/modules/home/pages/gallery-home.component";
import { HomeRoutingModule } from "@gallery/modules/home/home-routing.module";
import { NgxScrollbarModule } from "@modules/share/ngx-scrollbar/ngx-scrollbar.module";
import { MaterialModule } from "@modules/share/material/material.module";


@NgModule({
  declarations: [
    GalleryHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    NgxScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
  ]
})
export class HomeModule {}
