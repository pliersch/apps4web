import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryHomeComponent } from "@gallery/modules/home/pages/gallery-home.component";

const routes: Routes = [
  {
    path: '', component: GalleryHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
