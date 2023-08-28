import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from "@angular/material/tooltip";

import { PlayerComponent } from "@modules/radio/components/player/player.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { WidgetPlayerComponent } from './components/widget-player/widget-player.component';

import { RadioRoutingModule } from './radio-routing.module';


@NgModule({
    exports: [
        PlayerComponent,
        WidgetPlayerComponent
    ],
    imports: [
    CommonModule,
    RadioRoutingModule,
    NgScrollbarModule,
    MatTooltipModule,
    PlayerComponent,
    WidgetPlayerComponent
]
})
export class RadioModule {}
