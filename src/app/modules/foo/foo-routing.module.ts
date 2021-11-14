import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BarComponent} from "@modules/foo/bar/bar.component";
import {RouterContainerComponent} from "@modules/foo/router-container/router-container.component";
import {AddressComponent} from "@modules/foo/address/address.component";

const routes: Routes = [
  {
    path: '', component: RouterContainerComponent,
    children: [
      { path: 'xy', component: BarComponent },
      { path: 'ss', component: AddressComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooRoutingModule { }
