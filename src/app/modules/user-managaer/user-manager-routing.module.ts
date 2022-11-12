import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMangerLayoutComponent } from "@modules/user-managaer/layout/user-manger-layout.component";
import { UserOverviewComponent } from "@modules/user-managaer/components/user-overview.component";

const routes: Routes = [
  {
    path: '', component: UserMangerLayoutComponent,
    children: [
      {path: '', component: UserOverviewComponent},
      // { path: 'accounts', loadChildren: accountsModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule {}
