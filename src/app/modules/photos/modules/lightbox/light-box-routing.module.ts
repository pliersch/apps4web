import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosLightboxComponent } from "@modules/photos/modules/lightbox/pages/photos-lightbox.component";

const routes: Routes = [
  {
    path: '', component: PhotosLightboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightBoxRoutingModule {}
