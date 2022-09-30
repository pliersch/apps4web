import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@app/shared/material/material.module";
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { VerifyEmailComponent } from './verify-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { SocialLoginComponent } from '@app/modules/account/social-login/social-login.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { AccountMenuComponent } from "@modules/account/account-menu/account-menu.component";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "@modules/account/store/auth.state";
import { ShareModule } from "@modules/share/share.module";
import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
    NgxsModule.forFeature([AuthState]),
    ShareModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccountMenuComponent,
    SocialLoginComponent,
    EmailLoginComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }],
  exports: [AccountMenuComponent]
})
export class AccountModule {
}
