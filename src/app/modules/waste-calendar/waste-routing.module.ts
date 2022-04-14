import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WasteReminderComponent} from "@modules/waste-calendar/reminder/waste-reminder.component";

const routes: Routes = [
  {
    path: '', component: WasteReminderComponent,
    children: [
      {path: 'x', component: WasteReminderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WasteRoutingModule {
}
