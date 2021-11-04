import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {HttpClientModule} from "@angular/common/http";
import {AppBarComponent} from "./modules/app-bar/app-bar.component";
import {AccountMenuComponent} from "./modules/account/account-menu/account-menu.component";
import {ThemeMenuComponent} from "./modules/theme-menu/theme-menu.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {DashboardCardComponent} from "./modules/dashboard/cards/dashboard-card.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent,
    AppBarComponent,
    AccountMenuComponent,
    ThemeMenuComponent,
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
