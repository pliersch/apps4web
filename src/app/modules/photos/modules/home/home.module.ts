import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from "@modules/photos/modules/home/home-routing.module";
import { PhotosHomeComponent } from "@modules/photos/modules/home/pages/photos-home.component";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { ShareModule } from "@modules/share";
import { MaterialModule } from "@modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { PhotosHighlightComponent } from './components/photos-highlight.component';


@NgModule({
  declarations: [
    PhotosHomeComponent,
    PhotosHighlightComponent
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
