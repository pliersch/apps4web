import { AccountModule } from '@account/account.module';
import { AccountState } from '@account/store/account.state';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import {
  APP_INITIALIZER,
  enableProdMode,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID
} from '@angular/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { GlobalErrorHandler } from '@app/common/helpers/global-error-handler';
import { AlertService } from "@app/common/services/alert.service";
import { AppInjectorService } from "@app/common/services/app-injector.service";
import { initApplication } from '@app/core/initializers/app.initializer';
import { initTheme } from '@app/core/initializers/theme.initializer';
import { AppState } from '@app/core/stores/app/app.state';
import { RouterState } from '@app/core/stores/routes/router.state';

import { environment } from '@environments/environment';
import { RadioModule } from '@modules/radio/radio.module';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { ThemeState } from '@modules/themes/stores/theme-state';
import { WasteCalendarModule } from '@modules/waste-calendar/waste-calendar.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule, NgxsModuleOptions, Store } from '@ngxs/store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './app/reducers';

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
};

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeDe);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, MatSnackBarModule, MatDialogModule, 
    //SocketIoModule.forRoot(config),
    NgxsModule.forRoot([AppState, RouterState, ThemeState, AccountState], ngxsConfig), NgxsReduxDevtoolsPluginModule.forRoot( /*{disabled: !isDevMode()}*/), WasteCalendarModule, RecipesModule, ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
    }), RadioModule, AccountModule, NgScrollbarModule),
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    { provide: APP_INITIALIZER, useFactory: initApplication, multi: true, deps: [Store] },
    { provide: APP_INITIALIZER, useFactory: initTheme, multi: true, deps: [Store] },
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: AlertService, useClass: AlertService },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideStore(reducers, { metaReducers })
]
})
  .then((moduleRef) => {
    AppInjectorService.setInjector(moduleRef.injector)
  })
  .catch(err => console.error(err));
