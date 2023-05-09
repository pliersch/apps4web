import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosHomeComponent } from "@modules/photos/modules/home/pages/photos-home.component";

const routes: Routes = [
  {
    path: '', component: PhotosHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
