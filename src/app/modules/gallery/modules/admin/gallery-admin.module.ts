import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GalleryAdminRoutingModule } from "@gallery/modules/admin/gallery-admin-routing.module";
import { GalleryAdminComponent } from './components/generally/gallery-admin.component';

@NgModule({
  declarations: [
    GalleryAdminComponent
  ],
  imports: [
    CommonModule,
    GalleryAdminRoutingModule
  ],
  exports: [
    GalleryAdminComponent
  ]
})
export class GalleryAdminModule {}
