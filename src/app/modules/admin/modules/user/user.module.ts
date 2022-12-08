import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { UserLayoutComponent } from "@modules/admin/modules/user/layout/user-layout.component";
import { MaterialModule } from "@app/shared/material/material.module";
import { DatePipe } from "@modules/admin/modules/user/pipes/date.pipe";
import { RolePipe } from './pipes/role.pipe';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    UserOverviewComponent,
    UserLayoutComponent,
    DatePipe,
    RolePipe,
    StatusPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSortModule,
    MaterialModule
  ]
})
export class UserModule {}