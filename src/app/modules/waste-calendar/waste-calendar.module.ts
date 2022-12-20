import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasteReminderComponent } from './reminder/waste-reminder.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { WasteRoutingModule } from "@modules/waste-calendar/waste-routing.module";
import { MatNativeDateModule } from "@angular/material/core";
import { MaterialModule } from "@app/modules/share/material/material.module";

@NgModule({
  declarations: [
    WasteReminderComponent
  ],
  exports: [
    WasteReminderComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    WasteRoutingModule,
    MatCardModule,
    MaterialModule
  ]
})
export class WasteCalendarModule {}
