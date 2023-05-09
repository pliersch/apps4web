import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PhotosUploadComponent } from "@modules/photos/modules/upload/pages/photos-upload.component";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { MaterialModule } from "@modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";

import { UploadRoutingModule } from './upload-routing.module';


@NgModule({
  declarations: [
    PhotosUploadComponent
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
