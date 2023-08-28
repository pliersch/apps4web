import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotosContainerComponent } from '@modules/photos/core';
import { PhotosResolver } from "@modules/photos/resolver/photos.resolver";
import { PhotoService } from "@modules/photos/services/photo.service";
import { TagService } from "@modules/photos/services/tag.service";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";

import { NgxsModule } from "@ngxs/store";

import { PhotosRoutingModule } from './photos-routing.module';

@NgModule({
    imports: [
    CommonModule,
    PhotosRoutingModule,
    NgxsModule.forFeature([PhotoState, TagState]),
    PhotosContainerComponent,
],
    providers: [TagService, PhotoService, PhotosResolver],
})

export class PhotosModule {
}
