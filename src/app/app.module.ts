import { AccountModule } from "@account/account.module";
import { AccountState } from "@account/store/account.state";
import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, ErrorHandler, isDevMode, NgModule } from '@angular/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from "@angular/material-date-fns-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from "@angular/service-worker";
import { GlobalErrorHandler } from "@app/common/helpers/global-error-handler";
import { AppBarComponent } from "@app/core/components/app-bar/app-bar.component";
import { initApplication } from "@app/core/initializers/app.initializer";
import { initTheme } from "@app/core/initializers/theme.initializer";
import { RouterState } from "@app/core/stores/routes/router.state";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { environment } from "@environments/environment";
import { DashboardCardComponent } from "@modules/dashboard/cards/dashboard-card.component";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { RadioModule } from "@modules/radio/radio.module";
import { RecipesModule } from "@modules/recipes/recipes.module";
import { ThemeMenuComponent } from "@modules/themes/menus/theme-menu.component";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { WasteCalendarModule } from "@modules/waste-calendar/waste-calendar.module";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule, NgxsModuleOptions, Store } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from "./core/layouts/auth-layout/auth-layout.component";
import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";
import { ActionFooterComponent } from './modules/action-footer/action-footer.component';

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

// const config: SocketIoConfig = {
//   url: environment.socketUrl, // socket server url;
//   options: {
//     transports: ['websocket']
//   }
// }

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    AuthLayoutComponent,
    AppComponent,
    AppBarComponent,
    ThemeMenuComponent,
    DashboardComponent,
    DashboardCardComponent,
    ActionFooterComponent,
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
    //SocketIoModule.forRoot(config),
    NgxsModule.forRoot([RouterState, ThemeState, AccountState], ngxsConfig),
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
    {provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS},
    {provide: APP_INITIALIZER, useFactory: initApplication, multi: true, deps: [Store]},
    {provide: APP_INITIALIZER, useFactory: initTheme, multi: true, deps: [Store]},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
