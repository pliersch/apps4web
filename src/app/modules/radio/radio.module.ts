import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { PlayerComponent } from './player/player.component';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    RadioRoutingModule,
    MaterialModule,
    NgScrollbarModule
  ]
})
export class RadioModule {}
