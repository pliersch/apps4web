import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { UserMangerLayoutComponent } from "@modules/admin/modules/user/layout/user-manger-layout.component";


@NgModule({
  declarations: [
    UserOverviewComponent,
    UserMangerLayoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSortModule
  ]
})
export class UserModule {}
