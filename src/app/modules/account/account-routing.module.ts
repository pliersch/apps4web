import { AccountInfoComponent } from "@account/components/account-info/account-info.component";
import { HiddenLoginComponent } from "@account/components/hidden-login/hidden-login.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'login', component: HiddenLoginComponent},
      {path: '**', component: AccountInfoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
