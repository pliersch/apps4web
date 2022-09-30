import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxsModule, Store } from '@ngxs/store';

import { SocialLoginModule } from "@abacritt/angularx-social-login";
import { NgScrollbarModule } from "ngx-scrollbar";
import { GlobalErrorHandler } from "@app/core/helpers/global-error-handler";
import { environment } from "@environments/environment";
import { AppBarComponent } from "@modules/app-bar/app-bar.component";
import { ThemeMenuComponent } from "@modules/themes/menus/theme-menu.component";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { DynamicAppbarComponent } from "@modules/app-bar/dynamic/dynamic-appbar.component";
import { DynamicAppbarDirective } from "@modules/app-bar/dynamic/dynamic-appbar.directive";
import { DashboardCardComponent } from "@modules/dashboard/cards/dashboard-card.component";
import { LegalNoticeComponent } from "@modules/legal-notice/legal-notice.component";
import { AccountModule } from "@modules/account/account.module";
import { MaterialModule } from "@app/shared/material/material.module";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { WasteCalendarModule } from "@modules/waste-calendar/waste-calendar.module";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from "@angular/material-date-fns-adapter";
import { initTheme } from "@app/core/initializers/theme.initializer";
import { initApplication } from "@app/core/initializers/app.initializer";
import { JwtInterceptor } from "@app/core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "@app/core/helpers/error.interceptor";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { RecipesModule } from "@modules/recipes/recipes.module";


// TODO use this then update "angularx-social-login"
// const googleLoginOptions: GoogleInitOptions = {
//   oneTapEnabled: false, // default is true
// };
// https://github.com/abacritt/angularx-social-login/issues/524#issuecomment-1236529035

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
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
    NgxsModule.forRoot([ThemeState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    WasteCalendarModule,
    RecipesModule
  ],
  exports: [],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: true,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '334979481378-o30p8vigr8pma4sdod58qepl6ekk1k8b.apps.googleusercontent.com'
    //         )
    //       }
    //     ]
    //   } as SocialAuthServiceConfig
    // },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS},
    {
      provide: APP_INITIALIZER, useFactory: initApplication, multi: true, deps: [
        Store
      ]
    },
    {
      provide: APP_INITIALIZER, useFactory: initTheme, multi: true, deps: [
        Store
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
