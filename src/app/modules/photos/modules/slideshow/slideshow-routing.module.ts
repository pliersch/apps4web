import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosSlideshowComponent } from "@modules/photos/modules/slideshow/pages/photos-slideshow.component";

const routes: Routes = [
  {
    path: '', component: PhotosSlideshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlideshowRoutingModule {}
