import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { NgxsModule } from "@ngxs/store";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from "./layout/admin-layout.component";

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgxsModule.forFeature([PhotoState/*, TagState*/]),
  ]
})
export class AdminModule {}
