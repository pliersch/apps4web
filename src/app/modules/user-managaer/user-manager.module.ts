import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOverviewComponent } from './components/user-overview.component';
import { RouterLinkWithHref } from "@angular/router";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { UserMangerLayoutComponent } from "@modules/user-managaer/layout/user-manger-layout.component";
import { UserManagerRoutingModule } from "@modules/user-managaer/user-manager-routing.module";


@NgModule({
  declarations: [
    UserMangerLayoutComponent,
    UserOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    UserManagerRoutingModule,
    MatSortModule,
    MatTableModule
  ]
})
export class UserManagerModule {}
