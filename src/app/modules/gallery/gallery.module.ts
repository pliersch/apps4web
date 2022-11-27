import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MaterialModule } from "@app/shared/material/material.module";
// import {NgxScrollbarModule} from '@app/shared/ngx-scrollbar/ngx-scrollbar.module';
// TODO replace
import { NgScrollbarModule } from 'ngx-scrollbar';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryToolbarComponent } from './components/core/toolbar/gallery-toolbar.component';
import { GalleryContainerComponent } from './components/core/container/gallery-container.component';
import { GalleryExplorerComponent } from './components/explorer/gallery-explorer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GalleryHomeComponent } from './components/home/gallery-home.component';
import { GalleryUploadComponent } from './components/upload/gallery-upload.component';
import { GalleryLightboxComponent } from '@gallery/components/lightbox/gallery-lightbox.component';
import {
  GalleryVerticalScrollerComponent
} from '@gallery/components/share/vertical-scroller/gallery-vertical-scroller.component';
import {
  GalleryHorizontalScrollerComponent
} from '@gallery/components/share/horizontal-scroller/gallery-horizontal-scroller.component';
import { GalleryImageGridComponent } from '@gallery/components/lightbox/image-grid/gallery-image-grid.component';

import { ShareModule } from '@app/modules/share/share.module';
import { GalleryFilterPanelComponent } from './components/explorer/filter-panel/gallery-filter-panel.component';
import { GalleryImageDetailComponent } from './components/explorer/image-detail/gallery-image-detail.component';
import {
  GalleryImagePlaceholderComponent
} from './components/share/image-placeholder/gallery-image-placeholder.component';
import { GalleryStarRatingComponent } from '@gallery/components/share/star-rating/gallery-star-rating.component';
import {
  GalleryEditTagDetailComponent
} from './components/explorer/edit-tags/edit-tag-detail/gallery-edit-tag-detail.component';
import { GalleryEditTagsComponent } from './components/explorer/edit-tags/gallery-edit-tags.component';
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { ImageControlComponent } from './components/share/image-control/image-control.component';
import { ImageControl2Component } from './components/share/image-control2/image-control2.component';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ActionBarModule } from "@modules/action-bar/action-bar.module";
import { TagState } from "@gallery/store/tags/tag.state";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  GalleryNewTagGroupComponent
} from './components/explorer/new-tag-group/gallery-new-tag-group.component';
import {
  GalleryEditImageTagsComponent
} from './components/explorer/edit-tags-dialog/gallery-edit-image-tags.component';
import { GalleryMetaPanelComponent } from './components/explorer/meta-panel/gallery-meta-panel.component';
import { GallerySlideshowComponent } from './components/slideshow/gallery-slideshow.component';
import { GalleryActionPanelComponent } from './components/explorer/action-panel/gallery-action-panel.component';
import { GalleryRatingFilterComponent } from './components/explorer/rating-filter/gallery-rating-filter.component';
import { GalleryRatingComponent } from './components/explorer/rating-panel/gallery-rating.component';
import { GalleryDateFilterComponent } from './components/explorer/date-filter/gallery-date-filter.component';
import { GalleryDeletePhotoComponent } from './components/explorer/delete-photo-dialog/gallery-delete-photo.component';
import { GalleryEditorComponent } from "./components/editor/gallery-editor.component";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { ToggleExplorerViewService } from "@gallery/services/toggle-explorer-view.service";

@NgModule({
  declarations: [
    GalleryToolbarComponent,
    GalleryContainerComponent,
    GalleryExplorerComponent,
    GalleryHomeComponent,
    GalleryUploadComponent,
    GalleryLightboxComponent,
    GalleryVerticalScrollerComponent,
    GalleryHorizontalScrollerComponent,
    GalleryImageGridComponent,
    GalleryFilterPanelComponent,
    GalleryImageDetailComponent,
    GalleryImagePlaceholderComponent,
    GalleryStarRatingComponent,
    GalleryEditTagDetailComponent,
    GalleryEditTagsComponent,
    ImageControlComponent,
    ImageControl2Component,
    GalleryNewTagGroupComponent,
    GalleryEditImageTagsComponent,
    GalleryMetaPanelComponent,
    GallerySlideshowComponent,
    GalleryActionPanelComponent,
    GalleryRatingFilterComponent,
    GalleryRatingComponent,
    GalleryDateFilterComponent,
    GalleryDeletePhotoComponent,
    GalleryEditorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    GalleryRoutingModule,
    ScrollingModule,
    // NgxScrollbarModule,
    NgScrollbarModule,
    ShareModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    MatButtonToggleModule,
    ActionBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatCheckboxModule,
    NgOptimizedImage,
  ],
  providers: [TagService, PhotoService, GalleryResolver, ToggleExplorerViewService],
})

export class GalleryModule {
}
