import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from "./layout/admin-layout.component";
import { MaterialModule } from "@app/shared/material/material.module";


@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule {}
