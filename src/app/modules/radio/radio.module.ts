import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { PlayerComponent } from './player/player.component';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { NgxScrollbarModule } from "@app/modules/share/ngx-scrollbar/ngx-scrollbar.module";


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
    NgxScrollbarModule
  ]
})
export class RadioModule {}
