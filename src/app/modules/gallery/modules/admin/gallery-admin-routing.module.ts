import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryAdminComponent } from "@gallery/modules/admin/components/generally/gallery-admin.component";

const routes: Routes = [
  {
    path: '', component: GalleryAdminComponent,
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
export class GalleryAdminRoutingModule {}
