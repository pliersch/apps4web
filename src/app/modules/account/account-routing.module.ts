import { LoginComponent } from "@account/components/login/login.component";
import { AccountProfileComponent } from "@account/components/profile/account-profile.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: AccountProfileComponent},
      {path: 'login', component: LoginComponent},
      // {path: '**', redirectTo: '/account/profile', pathMatch: 'full'},
      // {path: '', redirectTo: '/account/profile', pathMatch: 'full'},
      // {path: '**', component: AccountProfileComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
