import { LoginComponent } from "@account/components/login/login.component";
import { PhotoSettingsComponent } from "@account/components/photo-settings/photo-settings.component";
import { AccountProfileComponent } from "@account/components/profile/account-profile.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'profile', component: AccountProfileComponent},
      {path: 'photos', component: PhotoSettingsComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: '/account/profile', pathMatch: 'full'},
      {path: '', redirectTo: '/account/profile', pathMatch: 'full'},
      // {path: '**', component: AccountProfileComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
