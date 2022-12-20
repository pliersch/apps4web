import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { SamplesRoutingModule } from './samples-routing.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { SelectWithOptionsComponent } from './select-with-options/select-with-options.component';

// import { SelectionJsComponent } from './selection-js/selection-js.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    SelectWithOptionsComponent,
    // SelectionJsComponent,
  ],
  exports: [
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SamplesRoutingModule,
  ]
})
export class SamplesModule {
}
