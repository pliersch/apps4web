import { SigninComponent } from "@account/components/signin-menu/signin.component";
import { AccountService } from "@account/store/account.service";
import { AccountState } from "@account/store/account.state";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { NgxsModule } from "@ngxs/store";
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AccountOverviewComponent } from './components/overview/account-overview.component';
import { AccountProfileComponent } from './components/profile/account-profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
    NgxsModule.forFeature([AccountState]),
    ShareModule,
  ],
  declarations: [
    AccountOverviewComponent,
    SigninComponent,
    AccountProfileComponent,
    LoginComponent,
  ],
  exports: [
    SigninComponent
  ],
  providers: [AccountService]
})
export class AccountModule {
}
