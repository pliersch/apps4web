import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddressFormComponent} from "@modules/samples/address-form/address-form.component";

const routes: Routes = [
  {
    path: '', component: AddressFormComponent,
    children: [
      {path: 'address', component: AddressFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule {
}
