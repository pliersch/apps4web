import { LoginComponent } from "@account/components/login/login.component";
// import { PhotoSettingsComponent } from "@account/components/photo-settings/photo-settings.component";
import { AccountProfileComponent } from "@account/components/profile/account-profile.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountOverviewComponent } from './components/overview/account-overview.component';

const routes: Routes = [
  {path: 'login', title: 'Login', component: LoginComponent},
  {
    path: '',
    component: AccountOverviewComponent,
    children: [
      {path: 'profile', title: 'Account', component: AccountProfileComponent},
      // {path: 'photos', component: PhotoSettingsComponent},
      {path: '**', redirectTo: 'profile', pathMatch: 'full'},
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
