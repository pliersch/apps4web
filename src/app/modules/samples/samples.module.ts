import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "@app/shared/material/material.module";
import { SamplesRoutingModule } from './samples-routing.module';
import { AddressFormComponent } from './address-form/address-form.component';

// import { SelectionJsComponent } from './selection-js/selection-js.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    // SelectionJsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SamplesRoutingModule,
  ]
})
export class SamplesModule {
}
