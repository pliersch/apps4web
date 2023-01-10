import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GallerySlideshowComponent } from "@gallery/modules/slideshow/pages/gallery-slideshow.component";

const routes: Routes = [
  {
    path: '', component: GallerySlideshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlideshowRoutingModule {}
