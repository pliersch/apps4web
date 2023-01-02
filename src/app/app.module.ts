import { APP_INITIALIZER, ErrorHandler, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule, NgxsModuleOptions, Store } from '@ngxs/store';
import { GlobalErrorHandler } from "@app/common/helpers/global-error-handler";
import { environment } from "@environments/environment";
import { ThemeMenuComponent } from "@modules/themes/menus/theme-menu.component";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { DashboardCardComponent } from "@modules/dashboard/cards/dashboard-card.component";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { WasteCalendarModule } from "@modules/waste-calendar/waste-calendar.module";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from "@angular/material-date-fns-adapter";
import { initTheme } from "@app/common/initializers/theme.initializer";
import { initApplication } from "@app/common/initializers/app.initializer";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { RecipesModule } from "@modules/recipes/recipes.module";
import { RadioModule } from "@modules/radio/radio.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AccountState } from "@account/store/account.state";
import { AccountModule } from "@account/account.module";
import { AppBarComponent } from "@app/core/components/app-bar/app-bar.component";

const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See above for their effects)
    suppressErrors: false,
    injectContainerState: false
  },
  compatibility: {
    strictContentSecurityPolicy: true
  },
  // Execution strategy overridden for illustrative purposes
  // (only do this if you know what you are doing)
  // executionStrategy: NoopNgxsExecutionStrategy
};

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    AuthLayoutComponent,
    AppComponent,
    AppBarComponent,
    ThemeMenuComponent,
    DashboardComponent,
    DashboardCardComponent,
    // DynamicAppbarDirective,
    // DynamicAppbarComponent,
    // LegalNoticeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NgScrollbarModule,
    MaterialModule,
    // AuthModule,
    NgxsModule.forRoot([ThemeState, AccountState], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    WasteCalendarModule,
    RecipesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RadioModule,
    AccountModule,
  ],
  exports: [],
  providers: [
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
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
