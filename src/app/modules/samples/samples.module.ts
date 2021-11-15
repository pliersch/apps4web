import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@app/shared/material/material.module";
import {SamplesRoutingModule} from './samples-routing.module';
import {AddressFormComponent} from './address-form/address-form.component';

@NgModule({
  declarations: [
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
