import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@app/modules/share/material/material.module";
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryToolbarComponent } from './components/core/toolbar/gallery-toolbar.component';
import { GalleryContainerComponent } from './components/core/container/gallery-container.component';
import { ShareModule } from '@app/modules/share/share.module';
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { ToggleExplorerViewService } from "@gallery/services/toggle-explorer-view.service";

@NgModule({
  declarations: [
    GalleryToolbarComponent,
    GalleryContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GalleryRoutingModule,
    ShareModule,
    NgxsModule.forFeature([PhotoState, TagState]),
  ],
  providers: [TagService, PhotoService, GalleryResolver, ToggleExplorerViewService],
})

export class GalleryModule {
}
