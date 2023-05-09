import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotosAdminRoutingModule } from "@modules/photos/modules/admin/photos-admin-routing.module";
import { PhotosAdminService } from "@modules/photos/modules/admin/service/photos-admin.service";
import { MaterialModule } from "@modules/share";
import { PhotosAdminComponent } from './components/photos-admin.component';

@NgModule({
  declarations: [
    PhotosAdminComponent
  ],
  imports: [
    CommonModule,
    PhotosAdminRoutingModule,
    MaterialModule
  ],
  providers: [
    PhotosAdminService
  ],
  exports: [
    PhotosAdminComponent
  ]
})
export class PhotosAdminModule {}
