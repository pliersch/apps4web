import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorContainerComponent} from "@modules/doctor/doctor-container.component";

const routes: Routes = [
  {
    path: '', component: DoctorContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {
}
