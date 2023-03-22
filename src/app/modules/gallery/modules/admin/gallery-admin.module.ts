import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GalleryAdminRoutingModule } from "@gallery/modules/admin/gallery-admin-routing.module";
import { GalleryAdminService } from "@gallery/modules/admin/service/gallery-admin.service";
import { MaterialModule } from "@modules/share";
import { GalleryAdminComponent } from './components/generally/gallery-admin.component';

@NgModule({
  declarations: [
    GalleryAdminComponent
  ],
  imports: [
    CommonModule,
    GalleryAdminRoutingModule,
    MaterialModule
  ],
  providers: [
    GalleryAdminService
  ],
  exports: [
    GalleryAdminComponent
  ]
})
export class GalleryAdminModule {}
