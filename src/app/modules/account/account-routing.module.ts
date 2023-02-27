import { AccountInfoComponent } from "@account/components/account-info/account-info.component";
import { HiddenLoginComponent } from "@account/components/hidden-login/hidden-login.component";
import { AuthGuard } from "@account/guards/auth.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'profile', component: AccountInfoComponent, canActivate: [AuthGuard]},
      {path: 'login', component: HiddenLoginComponent},
      // TODO disabled for test. re-enable asap
      // {path: '**', component: AccountInfoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
