import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryLightboxComponent } from "@gallery/modules/lightbox/pages/gallery-lightbox.component";

const routes: Routes = [
  {
    path: '', component: GalleryLightboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightBoxRoutingModule {}
