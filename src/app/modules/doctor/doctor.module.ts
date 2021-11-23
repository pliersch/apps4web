import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@app/shared/material/material.module";
import {DoctorRoutingModule} from './doctor-routing.module';
import {DoctorContainerComponent} from './doctor-container.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    DoctorContainerComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule {
}
