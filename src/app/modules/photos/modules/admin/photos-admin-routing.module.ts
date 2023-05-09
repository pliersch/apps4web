import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosAdminComponent } from "@modules/photos/modules/admin/components/photos-admin.component";

const routes: Routes = [
  {
    path: '', component: PhotosAdminComponent,
  }
];
// const routes: Routes = [
//   {
//     path: '', component: UserLayoutComponent,
//     children: [
//       {path: '', component: UserOverviewComponent},
//       {path: '**', component: UserOverviewComponent},
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosAdminRoutingModule {}
