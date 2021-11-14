import {APP_INITIALIZER, ErrorHandler, Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LayoutModule} from "@angular/cdk/layout";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {Store, StoreModule} from '@ngrx/store';
import {LoaderEffect} from '@app/stores/app/app.store.loader.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {appStateReducer} from '@app/stores/app/app.store.reducer';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";
import {UserService} from "@app/services";
import {ErrorInterceptor, initApplication, JwtInterceptor} from "@app/core/helpers";
import {NgScrollbarModule} from "ngx-scrollbar";
import {GlobalErrorHandler} from "@app/core/helpers/global-error-handler";
import {environment} from "@environments/environment";
import {AppBarComponent} from "@modules/app-bar/app-bar.component";
import {AppFooterComponent} from "@modules/app-footer/app-footer.component";
import {ThemeMenuComponent} from "@modules/themes/menus/theme-menu.component";
import {DashboardComponent} from "@modules/dashboard/dashboard.component";
import {DynamicAppbarComponent} from "@modules/app-bar/dynamic/dynamic-appbar.component";
import {DynamicAppbarDirective} from "@modules/app-bar/dynamic/dynamic-appbar.directive";
import {DashboardCardComponent} from "@modules/dashboard/cards/dashboard-card.component";
import {LegalNoticeComponent} from "@modules/legal-notice/legal-notice.component";
import {AccountModule} from "@modules/account/account.module";
import {AddressFormComponent} from "./adress-form/address-form.component";

@NgModule({
  declarations: [
    AddressFormComponent,
    AppComponent,
    AppBarComponent,
    AppFooterComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent,
    ThemeMenuComponent,
    DashboardComponent,
    DashboardCardComponent,
    DynamicAppbarDirective,
    DynamicAppbarComponent,
    LegalNoticeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SamplesModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    LayoutModule,
    HttpClientModule,
    MatListModule,
    SocialLoginModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AccountModule,
    // @ts-ignore
    StoreModule.forRoot({appState: appStateReducer}),
    EffectsModule.forRoot([LoaderEffect]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    NgScrollbarModule
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
    },
    {
      provide: APP_INITIALIZER, useFactory: initApplication, multi: true, deps: [
        [new Inject(Store)],
        SocialAuthService,
        UserService]
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  // exports: [MatButtonLoadingDirective],
  bootstrap: [AppComponent]
})

export class AppModule {
}
