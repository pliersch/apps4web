import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";

const userModule = () => import('./modules/user/user.module').then((x) => x.UserModule);

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      {path: 'user', title: 'User Management', resolve: {userResolver: AdminUserResolver}, loadChildren: userModule},
      {path: '**', title: 'User Management', resolve: {userResolver: AdminUserResolver}, loadChildren: userModule}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
