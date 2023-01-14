import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
  EditorPhotoControlComponent,
  ExplorerPhotoControlComponent,
  GalleryActionPanelComponent,
  GalleryDateFilterComponent,
  GalleryDeletePhotoComponent,
  GalleryEditorComponent,
  GalleryEditPhotosComponent,
  GalleryExplorerComponent,
  GalleryImageDetailComponent,
  GalleryManageTagDetailComponent,
  GalleryManageTagsComponent,
  GalleryMetaPanelComponent,
  GalleryRatingComponent,
  GalleryRatingFilterComponent,
  GalleryStarRatingComponent,
  GalleryTagFilterComponent
} from "@gallery/modules/explorer/";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { MaterialModule } from "@modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ExplorerRoutingModule } from './explorer-routing.module';

@NgModule({
  declarations: [
    // AbstractExplorerComponent,
    GalleryExplorerComponent,
    GalleryEditorComponent,
    GalleryTagFilterComponent,
    GalleryImageDetailComponent,
    GalleryStarRatingComponent,
    GalleryManageTagsComponent,
    GalleryManageTagDetailComponent,
    ExplorerPhotoControlComponent,
    EditorPhotoControlComponent,
    GalleryEditPhotosComponent,
    GalleryMetaPanelComponent,
    GalleryActionPanelComponent,
    GalleryRatingFilterComponent,
    GalleryRatingComponent,
    GalleryDateFilterComponent,
    GalleryDeletePhotoComponent,

  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    MaterialModule,
    GalleryShareModule,
    ShareModule,
    NgScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    FormsModule,
  ]
})
export class ExplorerModule {}
