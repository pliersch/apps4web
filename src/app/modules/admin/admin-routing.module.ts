import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminProtocolResolver } from "@modules/admin/modules/protocol/resolver/admin-protocol.resolver";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";
import { PhotosAdminResolver } from "@modules/photos/modules/admin/resolver/photos-admin-resolver.service";

const protocolAdmin = () => import('./modules/protocol/protocol.module').then((x) => x.ProtocolModule);
const userAdmin = () => import('./modules/user/user.module').then((x) => x.UserModule);
const photosAdmin = () => import('@modules/photos/modules/admin/photos-admin.module').then((x) => x.PhotosAdminModule);

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      {path: 'visits', title: 'Visits', resolve: {resolver: AdminProtocolResolver}, loadChildren: protocolAdmin},
      {path: 'user', title: 'User', resolve: {resolver: AdminUserResolver}, loadChildren: userAdmin},
      {path: 'photos', title: 'Photos', resolve: {resolver: PhotosAdminResolver}, loadChildren: photosAdmin},
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
