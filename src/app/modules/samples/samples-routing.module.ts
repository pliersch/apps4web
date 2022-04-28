import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddressFormComponent} from "@modules/samples/address-form/address-form.component";
import {SelectionJsComponent} from "@modules/samples/selection-js/selection-js.component";

const routes: Routes = [

  {path: 'address', component: AddressFormComponent},
  {path: 'selection', component: SelectionJsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule {
}
