import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
  EditorPhotoControlComponent,
  ExplorerPhotoControlComponent,
  PhotosActionPanelComponent,
  PhotosDateFilterComponent,
  PhotosDeletePhotoComponent,
  PhotosEditorComponent,
  PhotosEditPhotosComponent,
  PhotosExplorerComponent,
  PhotosImageDetailComponent,
  PhotosManageTagDetailComponent,
  PhotosManageTagsComponent,
  PhotosMetaPanelEditorComponent,
  PhotosMetaPanelExplorerComponent,
  PhotosRatingComponent,
  PhotosRatingFilterComponent,
  PhotosTagFilterComponent
} from "@modules/photos/modules/explorer/index";

import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";


import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import {
  EditorInstructionDialogComponent
} from './components/editor-instruction-dialog/editor-instruction-dialog.component';
import { ExplorerRoutingModule } from './explorer-routing.module';

@NgModule({
    imports: [
    CommonModule,
    ExplorerRoutingModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    FormsModule,
    // AbstractExplorerComponent,
    PhotosExplorerComponent,
    PhotosEditorComponent,
    PhotosTagFilterComponent,
    PhotosImageDetailComponent,
    PhotosManageTagsComponent,
    PhotosManageTagDetailComponent,
    ExplorerPhotoControlComponent,
    EditorPhotoControlComponent,
    PhotosEditPhotosComponent,
    PhotosMetaPanelExplorerComponent,
    PhotosMetaPanelEditorComponent,
    PhotosActionPanelComponent,
    PhotosRatingFilterComponent,
    PhotosRatingComponent,
    PhotosDateFilterComponent,
    PhotosDeletePhotoComponent,
    EditorInstructionDialogComponent,
]
})
export class ExplorerModule {}
