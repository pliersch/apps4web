import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from "@modules/three/house/house.component";

const routes: Routes = [{
  path: '', component: HouseComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule {
}
