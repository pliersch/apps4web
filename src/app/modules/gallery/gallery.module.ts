import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatTableModule } from '@angular/material/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryToolbarComponent } from './components/core/gallery-toolbar/gallery-toolbar.component';
import { GalleryContainerComponent } from './components/core/gallery-container/gallery-container.component';
import { GalleryExplorerComponent } from './components/gallery-explorer/gallery-explorer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GalleryHomeComponent } from './components/gallery-home/gallery-home.component';
import { GalleryUploadComponent } from './components/gallery-upload/gallery-upload.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { photoReducer } from './store/photos/photo.reducer';
import { PhotosEffects } from '@gallery/store/photos/photos.effects';
import { PhotoService } from '@gallery/store/photos/photo.service';
import { PhotosResolver } from '@gallery/store/photos/photos.resolver';
import { GalleryLightboxComponent } from '@gallery/components/gallery-lightbox/gallery-lightbox.component';
import { GalleryVerticalScrollerComponent } from '@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component';
import { GalleryHorizontalScrollerComponent } from '@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component';
import { GalleryImageGridComponent } from '@gallery/components/gallery-lightbox/gallery-image-grid/gallery-image-grid.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryTagSelectorComponent } from './components/gallery-explorer/gallery-tag-selector/gallery-tag-selector.component';
import { GalleryPhotoFilterComponent } from './components/gallery-explorer/gallery-photo-filter/gallery-photo-filter.component';
import { TagService } from '@gallery/store/tags/tag.service';
import { EditTagsComponent } from './components/gallery-explorer/gallery-photo-filter/edit-tags/edit-tags.component';
import { TabNoHeaderDirective } from './components/gallery-explorer/gallery-photo-filter/tab-no-header.directive';
import { ShareModule } from '@app/modules/share/share.module';
import { TagEffects } from '@gallery/store/tags/tag.effects';
import { tagReducer } from './store/tags/tag.reducer';
import { GalleryFilterExpansionPanelComponent } from './components/gallery-explorer/gallery-filter-expansion-panel/gallery-filter-expansion-panel.component';
import { GalleryImageDetailComponent } from './components/gallery-explorer/gallery-image-detail/gallery-image-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GalleryImagePlaceholderComponent } from './components/share/gallery-image-placeholder/gallery-image-placeholder.component';
import { GalleryStarRatingComponent } from '@gallery/components/share/gallery-star-rating/gallery-star-rating.component';
import { GalleryEditTagDetailComponent } from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-detail/gallery-edit-tag-detail.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GalleryEditTagsComponent } from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tags.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListRemovePaddingDirective } from './components/gallery-explorer/gallery-edit-tags/mat-list-remove-padding.directive';
import { GalleryEditTagListComponent } from './components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-list/gallery-edit-tag-list.component';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";

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
    DragDropModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
    GalleryRoutingModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    // MatTableModule,
    ScrollingModule,
    NgScrollbarModule,
    EffectsModule.forFeature([PhotosEffects, TagEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature('photos', photoReducer),
    StoreModule.forFeature('tags', tagReducer),
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatMomentDateModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    ShareModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    PhotoService,
    PhotosResolver,
    TagService
  ]
})
export class GalleryModule {

  @ViewChild('fileInput') input: ElementRef | undefined;
}
