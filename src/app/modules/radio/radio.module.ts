import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { PlayerComponent } from "@modules/radio/components/player/player.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { WidgetPlayerComponent } from './components/widget-player/widget-player.component';

import { RadioRoutingModule } from './radio-routing.module';


@NgModule({
  declarations: [
    PlayerComponent,
    WidgetPlayerComponent
  ],
  exports: [
    PlayerComponent,
    WidgetPlayerComponent
  ],
  imports: [
    CommonModule,
    RadioRoutingModule,
    MaterialModule,
    NgScrollbarModule
  ]
})
export class RadioModule {}
