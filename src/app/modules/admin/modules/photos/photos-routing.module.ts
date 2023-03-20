import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosOverviewComponent } from "@modules/admin/modules/photos/components/photos-overview.component";
import { PhotosLayoutComponent } from "@modules/admin/modules/photos/layout/photos-layout.component";

const routes: Routes = [
  {
    path: '', component: PhotosLayoutComponent,
    children: [
      {path: '', component: PhotosOverviewComponent},
      {path: '**', component: PhotosOverviewComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule {}
