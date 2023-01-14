import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { GalleryUploadComponent } from "@gallery/modules/upload/pages/gallery-upload.component";
import { MaterialModule } from "@modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { FormsModule } from "@angular/forms";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    GalleryUploadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    UploadRoutingModule,
    ShareModule,
    FormsModule,
  ]
})
export class UploadModule {}
