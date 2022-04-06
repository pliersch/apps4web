import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBarComponent} from './action-bar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MaterialModule} from "@app/shared/material/material.module";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    ActionBarComponent
  ],
  exports: [
    ActionBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MaterialModule,
    MatTooltipModule
  ]
})
export class ActionBarModule {
}
