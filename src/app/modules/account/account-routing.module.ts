import { HiddenLoginComponent } from "@account/components/hidden-login/hidden-login.component";
import { AccountProfileComponent } from "@account/components/profile/account-profile.component";
import { AuthGuard } from "@account/guards/auth.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'profile', component: AccountProfileComponent, canActivate: [AuthGuard]},
      {path: 'login', component: HiddenLoginComponent},
      {path: '**', component: HiddenLoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
