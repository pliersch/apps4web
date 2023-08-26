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
import { PhotosShareModule } from "@modules/photos/modules/share/photos-share.module";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { MaterialModule } from "@modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import {
  EditorInstructionDialogComponent
} from './components/editor-instruction-dialog/editor-instruction-dialog.component';
import { ExplorerRoutingModule } from './explorer-routing.module';

@NgModule({
  declarations: [
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

  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    MaterialModule,
    PhotosShareModule,
    ShareModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    FormsModule,
  ]
})
export class ExplorerModule {}
