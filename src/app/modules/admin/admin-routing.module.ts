import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryAdminResolver } from "@gallery/modules/admin/resolver/gallery-admin.resolver";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";

const userAdmin = () => import('./modules/user/user.module').then((x) => x.UserModule);
const galleryAdmin = () => import('@modules/gallery/modules/admin/gallery-admin.module').then((x) => x.GalleryAdminModule);

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      {path: 'user', title: 'User', resolve: {resolver: AdminUserResolver}, loadChildren: userAdmin},
      {path: 'photos', title: 'Photos', resolve: {resolver: GalleryAdminResolver}, loadChildren: galleryAdmin},
      {path: '**', redirectTo: 'user', pathMatch: 'prefix'},
      {path: '', redirectTo: 'user', pathMatch: 'prefix'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
