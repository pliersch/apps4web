// import { AccountModule } from "@account/account.module";
// import { AccountState } from "@account/store/account.state";
// import { registerLocaleData } from '@angular/common';
// import { HttpClientModule } from "@angular/common/http";
// import localeDe from '@angular/common/locales/de';
// import { APP_INITIALIZER, ErrorHandler, isDevMode, LOCALE_ID, NgModule } from '@angular/core';
// import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from "@angular/material-date-fns-adapter";
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ServiceWorkerModule } from "@angular/service-worker";
// import { GlobalErrorHandler } from "@app/common/helpers/global-error-handler";
// import { AppBarComponent } from "@app/core/components/app-bar/app-bar.component";
// import { WidgetComponent } from "@app/core/components/widget/widget.component";
// import { WidgetDirective } from "@app/core/components/widget/widget.directive";
// import { initApplication } from "@app/core/initializers/app.initializer";
// import { initTheme } from "@app/core/initializers/theme.initializer";
// import { AppState } from "@app/core/stores/app/app.state";
// import { RouterState } from "@app/core/stores/routes/router.state";
//
// import { environment } from "@environments/environment";
// import { DashboardComponent } from "@modules/dashboard/dashboard.component";
// import { RadioModule } from "@modules/radio/radio.module";
// import { ThemeMenuComponent } from "@modules/themes/menus/theme-menu.component";
// import { ThemeState } from "@modules/themes/stores/theme-state";
// import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
// import { NgxsModule, NgxsModuleOptions, Store } from '@ngxs/store';
// import { NgScrollbarModule } from "ngx-scrollbar";
// import { AppRoutingModule } from './app-routing.module';
//
// import { AuthLayoutComponent } from "./core/layouts/auth-layout/auth-layout.component";
// import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";
//
// registerLocaleData(localeDe);
//
// const ngxsConfig: NgxsModuleOptions = {
//   developmentMode: !environment.production,
//   selectorOptions: {
//     // These Selector Settings are recommended in preparation for NGXS v4
//     // (See above for their effects)
//     suppressErrors: false,
//     injectContainerState: false
//   },
//   compatibility: {
//     strictContentSecurityPolicy: true
//   },
// };
//
// // const config: SocketIoConfig = {
// //   url: environment.socketUrl, // socket server url;
// //   options: {
// //     transports: ['websocket']
// //   }
// // }
//
// @NgModule({
//   declarations: [],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     //SocketIoModule.forRoot(config),
//     NgxsModule.forRoot([AppState, RouterState, ThemeState, AccountState], ngxsConfig),
//     NgxsReduxDevtoolsPluginModule.forRoot( /*{disabled: !isDevMode()}*/),
//     ServiceWorkerModule.register('ngsw-worker.js', {
//       enabled: !isDevMode(),
//       // Register the ServiceWorker as soon as the application is stable
//       // or after 30 seconds (whichever comes first).
//       registrationStrategy: 'registerWhenStable:30000'
//     }),
//     RadioModule,
//     AccountModule,
//     NgScrollbarModule,
//     DefaultLayoutComponent,
//     AuthLayoutComponent,
//     AppBarComponent,
//     ThemeMenuComponent,
//     DashboardComponent,
//     WidgetComponent,
//     WidgetDirective,
//   ],
//   exports: [],
//   providers: [
//     {provide: LOCALE_ID, useValue: 'de'},
//     {provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE]},
//     {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS},
//     {provide: APP_INITIALIZER, useFactory: initApplication, multi: true, deps: [Store]},
//     {provide: APP_INITIALIZER, useFactory: initTheme, multi: true, deps: [Store]},
//     // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
//     {provide: ErrorHandler, useClass: GlobalErrorHandler},
//   ],
//   bootstrap: []
// })
//
// export class AppModule {
// }
