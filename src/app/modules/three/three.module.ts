import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house/house.component';
import { ThreeRoutingModule } from "@modules/three/three-routing.module";

@NgModule({
  declarations: [
    HouseComponent
  ],
  imports: [
    CommonModule,
    ThreeRoutingModule
  ]
})
export class ThreeModule {}
