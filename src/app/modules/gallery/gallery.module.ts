import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryToolbarComponent } from '@gallery/core';
import { GalleryContainerComponent } from '@gallery/core';
import { NgxsModule } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { ToggleExplorerViewService } from "@gallery/services/toggle-explorer-view.service";
import { MaterialModule, ShareModule } from "@modules/share";

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
