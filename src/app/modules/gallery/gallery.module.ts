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
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {photoReducer} from './store/photos/photo.reducer';
import {PhotoService} from '@app/core/services/photo.service';
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
import {
  GalleryPhotoFilterComponent
} from './components/gallery-explorer/gallery-photo-filter/gallery-photo-filter.component';
import {TagService} from '@gallery/store/tags/tag.service';
import {EditTagsComponent} from './components/gallery-explorer/gallery-photo-filter/edit-tags/edit-tags.component';
import {TabNoHeaderDirective} from './components/gallery-explorer/gallery-photo-filter/tab-no-header.directive';
import {ShareModule} from '@app/modules/share/share.module';
import {TagEffects} from '@gallery/store/tags/tag.effects';
import {tagReducer} from './store/tags/tag.reducer';
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
import {
  GalleryEditTagListComponent
} from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-list/gallery-edit-tag-list.component';
import {NgxsModule} from "@ngxs/store";
import {PhotoState} from "@gallery/store/photos/photo-state";

@NgModule({
  declarations: [
    GalleryToolbarComponent,
    GalleryContainerComponent,
    GalleryExplorerComponent,
    GalleryHomeComponent,
    GalleryUploadComponent,
    GalleryLightboxComponent,
    GalleryLightboxComponent,
    GalleryVerticalScrollerComponent,
    GalleryHorizontalScrollerComponent,
    GalleryImageGridComponent,
    GalleryTagSelectorComponent,
    GalleryPhotoFilterComponent,
    EditTagsComponent,
    TabNoHeaderDirective,
    GalleryFilterExpansionPanelComponent,
    GalleryImageDetailComponent,
    GalleryImagePlaceholderComponent,
    GalleryStarRatingComponent,
    GalleryEditTagDetailComponent,
    GalleryEditTagsComponent,
    MatListRemovePaddingDirective,
    GalleryEditTagListComponent,
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
    NgxsModule.forFeature([PhotoState]),
    // StoreRouterConnectingModule.forRoot(),
    EffectsModule.forFeature([TagEffects]),
    StoreModule.forFeature('photos', photoReducer),
    StoreModule.forFeature('tags', tagReducer),

  ],
  providers: [
    PhotoService,
    TagService
  ]
})

export class GalleryModule {
}
