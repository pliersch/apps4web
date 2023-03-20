import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotosLayoutComponent } from "@modules/admin/modules/photos/layout/photos-layout.component";
import { PhotosRoutingModule } from "@modules/admin/modules/photos/photos-routing.module";
import { MaterialModule } from "@modules/share";
import { PhotosOverviewComponent } from './components/photos-overview.component';

@NgModule({
  declarations: [
    PhotosLayoutComponent,
    PhotosOverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PhotosRoutingModule
  ]
})
export class PhotosModule {}
