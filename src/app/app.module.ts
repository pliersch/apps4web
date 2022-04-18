import {APP_INITIALIZER, ErrorHandler, Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {Store, StoreModule} from '@ngrx/store';
import {NgxsModule, Store as NgxsStore} from '@ngxs/store';
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
import {ThemeMenuComponent} from "@modules/themes/menus/theme-menu.component";
import {DashboardComponent} from "@modules/dashboard/dashboard.component";
import {DynamicAppbarComponent} from "@modules/app-bar/dynamic/dynamic-appbar.component";
import {DynamicAppbarDirective} from "@modules/app-bar/dynamic/dynamic-appbar.directive";
import {DashboardCardComponent} from "@modules/dashboard/cards/dashboard-card.component";
import {LegalNoticeComponent} from "@modules/legal-notice/legal-notice.component";
import {AccountModule} from "@modules/account/account.module";
import {MaterialModule} from "@app/shared/material/material.module";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthState} from "@app/stores/auth/auth-state";
import {ThemeState} from "@modules/themes/stores/theme-state";
import {initTheme} from "@app/core/helpers/theme.initializer";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {WasteCalendarModule} from "@modules/waste-calendar/waste-calendar.module";

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    // AppFooterComponent,
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
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    AccountModule,
    NgScrollbarModule,
    MaterialModule,
    NgxsModule.forRoot([AuthState, ThemeState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    // @ts-ignore
    StoreModule.forRoot({appState: appStateReducer}),
    // StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([LoaderEffect]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatButtonToggleModule,
    WasteCalendarModule
  ],
  exports: [],
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
    {
      provide: APP_INITIALIZER, useFactory: initTheme, multi: true, deps: [
        NgxsStore
      ]
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
