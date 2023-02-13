import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@app/modules/share/material/material.module";
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NgxsModule } from "@ngxs/store";
import { AccountState } from "@account/store/account.state";
import { ShareModule } from "@modules/share/share.module";
import { AccountService } from "@account/services/account.service";
import { SigninComponent } from "@account/components/google-signin/signin.component";
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { HiddenLoginComponent } from './components/hidden-login/hidden-login.component';

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
    AccountInfoComponent,
    HiddenLoginComponent
  ],
  exports: [
    SigninComponent
  ],
  providers: [AccountService]
})
export class AccountModule {
}
