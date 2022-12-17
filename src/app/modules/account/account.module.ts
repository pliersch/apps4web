import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "@app/shared/material/material.module";
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { SocialLoginComponent } from '@app/modules/account/social-login/social-login.component';
import { NgxsModule } from "@ngxs/store";
import { AccountState } from "@account/store/account-state.service";
import { ShareModule } from "@modules/share/share.module";

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
  ],
})
export class AccountModule {
}
