import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";

const userModule = () => import('./modules/user/user.module').then((x) => x.UserModule);
const photosModule = () => import('./modules/photos/photos.module').then((x) => x.PhotosModule);

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AdminGuard],
    children: [
      {path: 'user', title: 'User', resolve: {userResolver: AdminUserResolver}, loadChildren: userModule},
      {path: 'photos', title: 'Photos', /*resolve: {userResolver: AdminUserResolver},*/ loadChildren: photosModule},
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
