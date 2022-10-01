import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { LazyComponent } from "@modules/auth/lazy.component";
import { AuthState } from "@modules/auth/store/auth-state";
import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { MaterialModule } from "@app/shared/material/material.module";

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  declarations: [LazyComponent, AuthMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([AuthState]),
    MaterialModule
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
  // exports: [AuthMenuComponent]
})
export class AuthModule {}
