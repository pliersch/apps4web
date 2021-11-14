import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooRoutingModule} from './foo-routing.module';
import {BarComponent} from './bar/bar.component';
import {RouterContainerComponent} from './router-container/router-container.component';
import {AddressComponent} from './address/address.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BarComponent,
    RouterContainerComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class FooModule {
}
