import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PhotosUploadComponent } from "@modules/photos/modules/upload/pages/photos-upload.component";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";


import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { UploadPanelComponent } from './components/upload/upload-panel.component';

import { UploadRoutingModule } from './upload-routing.module';


@NgModule({
    imports: [
    CommonModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    UploadRoutingModule,
    FormsModule,
    PhotosUploadComponent,
    UploadPanelComponent,
]
})
export class UploadModule {}
