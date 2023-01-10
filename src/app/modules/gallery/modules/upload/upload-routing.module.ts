import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryUploadComponent } from "@gallery/modules/upload/pages/gallery-upload.component";

const routes: Routes = [
  {
    path: '', component: GalleryUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
