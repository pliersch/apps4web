import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasteReminderComponent } from './reminder/waste-reminder.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { WasteRoutingModule } from "@modules/waste-calendar/waste-routing.module";
import { MatNativeDateModule } from "@angular/material/core";


@NgModule({
    exports: [
        WasteReminderComponent
    ],
    imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    WasteRoutingModule,
    WasteReminderComponent
]
})
export class WasteCalendarModule {}
