import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { VisitsTableComponent } from "@modules/admin/modules/protocol/components/visits-table/visits-table.component";
import { ProtocolRoutingModule } from "@modules/admin/modules/protocol/protocol-routing.module";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ProtocolOverviewComponent } from './components/protocol-overview.component';

@NgModule({
  declarations: [
    ProtocolOverviewComponent,
    VisitsTableComponent
  ],
  imports: [
    CommonModule,
    ProtocolRoutingModule,
    MatTableModule,
    NgScrollbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProtocolModule {}
