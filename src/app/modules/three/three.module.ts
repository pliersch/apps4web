import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { ThreeRoutingModule } from "@modules/three/three-routing.module";
import { HouseComponent } from './house/house.component';

@NgModule({
  declarations: [
    HouseComponent
  ],
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule
  ]
})
export class ThreeModule {}
