import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { UserDialogComponent } from '@modules/admin/modules/user/components/user-dialog/user-dialog.component';
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";
import { DatePipe } from "@modules/admin/modules/user/pipes/date.pipe";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { NgxsModule } from "@ngxs/store";
import { UserTableComponent } from './components/user-table/user-table.component';
import { RolePipe } from './pipes/role.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserOverviewComponent,
    DatePipe,
    RolePipe,
    StatusPipe,
    UserDialogComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSortModule,
    MaterialModule,
    NgxsModule.forFeature([UserState]),
  ]
})
export class UserModule {}
