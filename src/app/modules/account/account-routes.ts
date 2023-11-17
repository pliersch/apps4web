import { AccountComponent } from '@account/account.component';
import { LoginComponent } from '@account/components/login/login.component';
import { AccountProfileComponent } from '@account/components/profile/account-profile.component';
import { Route } from '@angular/router';


export default [
  {path: 'login', title: 'Login', component: LoginComponent},
  {
    path: '',
    component: AccountComponent,
    children: [
      {path: 'profile', title: 'Account', component: AccountProfileComponent},
      // {path: 'photos', component: PhotoSettingsComponent},
      {path: '**', redirectTo: 'profile', pathMatch: 'full'},
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
    ]
  }
] as Route[];

