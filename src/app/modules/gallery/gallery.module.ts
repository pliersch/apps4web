import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@app/shared/material/material.module";
// import {NgxScrollbarModule} from '@app/shared/ngx-scrollbar/ngx-scrollbar.module';
// TODO replace
import {NgScrollbarModule} from 'ngx-scrollbar';
import {GalleryRoutingModule} from './gallery-routing.module';
import {GalleryToolbarComponent} from './components/core/gallery-toolbar/gallery-toolbar.component';
import {GalleryContainerComponent} from './components/core/gallery-container/gallery-container.component';
import {GalleryExplorerComponent} from './components/gallery-explorer/gallery-explorer.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {GalleryHomeComponent} from './components/gallery-home/gallery-home.component';
import {GalleryUploadComponent} from './components/gallery-upload/gallery-upload.component';
import {GalleryLightboxComponent} from '@gallery/components/gallery-lightbox/gallery-lightbox.component';
import {
  GalleryVerticalScrollerComponent
} from '@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component';
import {
  GalleryHorizontalScrollerComponent
} from '@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component';
import {
  GalleryImageGridComponent
} from '@gallery/components/gallery-lightbox/gallery-image-grid/gallery-image-grid.component';
import {
  GalleryTagSelectorComponent
} from './components/gallery-explorer/gallery-tag-selector/gallery-tag-selector.component';
import {ShareModule} from '@app/modules/share/share.module';
import {
  GalleryFilterExpansionPanelComponent
} from './components/gallery-explorer/gallery-filter-expansion-panel/gallery-filter-expansion-panel.component';
import {
  GalleryImageDetailComponent
} from './components/gallery-explorer/gallery-image-detail/gallery-image-detail.component';
import {
  GalleryImagePlaceholderComponent
} from './components/share/gallery-image-placeholder/gallery-image-placeholder.component';
import {GalleryStarRatingComponent} from '@gallery/components/share/gallery-star-rating/gallery-star-rating.component';
import {
  GalleryEditTagDetailComponent
} from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-detail/gallery-edit-tag-detail.component';
import {GalleryEditTagsComponent} from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tags.component';
import {
  MatListRemovePaddingDirective
} from './components/gallery-explorer/gallery-edit-tags/mat-list-remove-padding.directive';
import {NgxsModule} from "@ngxs/store";
import {PhotoState} from "@gallery/store/photos/photo.state";
import {ImageControlComponent} from './components/share/image-control/image-control.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ActionBarModule} from "@modules/action-bar/action-bar.module";
import {TagState} from "@gallery/store/tags/tag.state";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {
  GalleryNewTagCategoryComponent
} from './components/gallery-explorer/gallery-new-tag-category/gallery-new-tag-category.component';
import {
  GalleryEditImageTagsComponent
} from './components/gallery-explorer/gallery-edit-image-tags/gallery-edit-image-tags.component';
import {TagService} from "@gallery/services/tag.service";
import {PhotoService} from "@gallery/services/photo.service";
import { GalleryMetaPanelComponent } from './components/gallery-explorer/gallery-meta-panel/gallery-meta-panel.component';

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
    GalleryTagSelectorComponent,
    GalleryFilterExpansionPanelComponent,
    GalleryImageDetailComponent,
    GalleryImagePlaceholderComponent,
    GalleryStarRatingComponent,
    GalleryEditTagDetailComponent,
    GalleryEditTagsComponent,
    MatListRemovePaddingDirective,
    ImageControlComponent,
    GalleryNewTagCategoryComponent,
    GalleryEditImageTagsComponent,
    GalleryMetaPanelComponent,
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
    // TODO enable, impl?
    // RouterModule.forChild(ROUTES),
    NgxsModule.forFeature([PhotoState, TagState]),
    // StoreRouterConnectingModule.forRoot(),
    MatButtonToggleModule,
    ActionBarModule,
    MatSlideToggleModule,
  ],
  providers: [
    PhotoService,
    TagService
  ]
})

export class GalleryModule {
}
