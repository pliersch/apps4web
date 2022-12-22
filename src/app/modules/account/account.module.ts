import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@app/modules/share/material/material.module";
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SocialLoginComponent } from '@app/modules/account/components/social-login/social-login.component';
import { NgxsModule } from "@ngxs/store";
import { AccountState } from "@account/store/account.state";
import { ShareModule } from "@modules/share/share.module";
import { AccountService } from "@account/services/account.service";
import { SigninComponent } from "@account/components/google-signin/signin.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
    NgxsModule.forFeature([AccountState]),
    ShareModule,
  ],
  declarations: [
    LayoutComponent,
    SocialLoginComponent,
    SigninComponent
  ],
  exports: [
    SigninComponent
  ],
  providers: [AccountService]
})
export class AccountModule {
}
