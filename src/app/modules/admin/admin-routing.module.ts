import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "@modules/admin/layout.component";

const userModule = () => import('./modules/user/user.module').then((x) => x.UserModule);

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'user', loadChildren: userModule},
      // { path: 'accounts', loadChildren: accountsModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
