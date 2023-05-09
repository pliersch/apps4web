import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosUploadComponent } from "@modules/photos/modules/upload/pages/photos-upload.component";

const routes: Routes = [
  {
    path: '', component: PhotosUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
