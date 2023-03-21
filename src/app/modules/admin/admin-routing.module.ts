import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";

const userModule = () => import('./modules/user/user.module').then((x) => x.UserModule);
const galleryAdminModule = () => import('@modules/gallery/modules/admin/gallery-admin.module').then((x) => x.GalleryAdminModule);

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AdminGuard],
    children: [
      {path: 'user', title: 'User', resolve: {userResolver: AdminUserResolver}, loadChildren: userModule},
      {path: 'photos', title: 'Photos', loadChildren: galleryAdminModule},
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
