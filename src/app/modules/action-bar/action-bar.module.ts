import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBarComponent} from './action-bar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MaterialModule} from "@app/shared/material/material.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ShareModule} from "@modules/share/share.module";


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
    MatTooltipModule,
    ShareModule
  ]
})
export class ActionBarModule {
}
