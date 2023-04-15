import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GalleryContainerComponent } from '@gallery/core';
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { PhotoService } from "@gallery/services/photo.service";
import { TagService } from "@gallery/services/tag.service";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { TagState } from "@gallery/store/tags/tag.state";
import { MaterialModule, ShareModule } from "@modules/share";
import { NgxsModule } from "@ngxs/store";

import { GalleryRoutingModule } from './gallery-routing.module';

@NgModule({
  declarations: [
    GalleryContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GalleryRoutingModule,
    ShareModule,
    NgxsModule.forFeature([PhotoState, TagState]),
  ],
  providers: [TagService, PhotoService, GalleryResolver],
})

export class GalleryModule {
}
