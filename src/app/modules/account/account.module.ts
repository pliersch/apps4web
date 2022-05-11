import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@app/shared/material/material.module";
import {AccountRoutingModule} from './account-routing.module';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {VerifyEmailComponent} from './verify-email.component';
import {ForgotPasswordComponent} from './forgot-password.component';
import {ResetPasswordComponent} from './reset-password.component';
import {MatButtonLoadingDirective} from "@app/directives/mat-button-loading.directive";
import {SocialLoginComponent} from '@app/modules/account/social-login/social-login.component';
import {EmailLoginComponent} from './email-login/email-login.component';
import {AccountMenuComponent} from "@modules/account/account-menu/account-menu.component";
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "@modules/account/store/auth-state";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
    NgxsModule.forFeature([AuthState]),
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    // TODO move in shared module
    MatButtonLoadingDirective,
    AccountMenuComponent,
    SocialLoginComponent,
    EmailLoginComponent
  ],
  exports: [MatButtonLoadingDirective, AccountMenuComponent]
})
export class AccountModule {
}
