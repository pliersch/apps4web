import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { GalleryExplorerComponent } from "@gallery/modules/explorer/pages/explorer/gallery-explorer.component";
import { GalleryEditorComponent } from "@gallery/modules/explorer/pages/editor/gallery-editor.component";
import { MaterialModule } from "@modules/share/material/material.module";
import {
  GalleryTagFilterComponent
} from "@gallery/modules/explorer/components/tag-filter/gallery-tag-filter.component";
import {
  GalleryImageDetailComponent
} from "@gallery/modules/explorer/components/image-detail/gallery-image-detail.component";
import {
  GalleryStarRatingComponent
} from "@gallery/modules/explorer/components/star-rating/gallery-star-rating.component";
import {
  ExplorerPhotoControlComponent
} from "@gallery/modules/explorer/components/explorer-photo-control/explorer-photo-control.component";
import {
  EditorPhotoControlComponent
} from "@gallery/modules/explorer/components/editor-photo-control/editor-photo-control.component";
import {
  GalleryNewTagGroupComponent
} from "@gallery/modules/explorer/components/new-tags-dialog/gallery-new-tag-group.component";
import {
  GalleryEditPhotosComponent
} from "@gallery/modules/explorer/components/edit-photos-dialog/gallery-edit-photos.component";
import {
  GalleryMetaPanelComponent
} from "@gallery/modules/explorer/components/meta-panel/gallery-meta-panel.component";
import {
  GalleryActionPanelComponent
} from "@gallery/modules/explorer/components/action-panel/gallery-action-panel.component";
import {
  GalleryRatingFilterComponent
} from "@gallery/modules/explorer/components/rating-filter/gallery-rating-filter.component";
import { GalleryRatingComponent } from "@gallery/modules/explorer/components/rating-panel/gallery-rating.component";
import {
  GalleryDateFilterComponent
} from "@gallery/modules/explorer/components/date-filter/gallery-date-filter.component";
import {
  GalleryDeletePhotoComponent
} from "@gallery/modules/explorer/components/delete-photo-dialog/gallery-delete-photo.component";
import {
  GalleryManageTagsComponent
} from "@gallery/modules/explorer/components/manage-tags-dialog/gallery-manage-tags.component";
import {
  GalleryManageTagDetailComponent
} from "@gallery/modules/explorer/components/manage-tags-dialog/manage-tag-detail/gallery-manage-tag-detail.component";
import { GalleryShareModule } from "@gallery/modules/share/gallery-share.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxScrollbarModule } from "@modules/share/ngx-scrollbar/ngx-scrollbar.module";
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { FormsModule } from "@angular/forms";


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
    GalleryNewTagGroupComponent,
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
    NgxScrollbarModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    FormsModule,
  ]
})
export class ExplorerModule {}
