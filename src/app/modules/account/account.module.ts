import { SigninComponent } from "@account/components/google-signin/signin.component";
import { AccountService } from "@account/store/account.service";
import { AccountState } from "@account/store/account.state";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { AccountRoutingModule } from './account-routing.module';
import { HiddenLoginComponent } from './components/hidden-login/hidden-login.component';
import { AccountProfileComponent } from './components/profile/account-profile.component';
import { LayoutComponent } from './layout/layout.component';

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
    SigninComponent,
    AccountProfileComponent,
    HiddenLoginComponent
  ],
  exports: [
    SigninComponent
  ],
  providers: [AccountService]
})
export class AccountModule {
}
