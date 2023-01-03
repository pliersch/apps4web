import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";

@NgModule({
  declarations: [
    ActionBarComponent
  ],
  exports: [
    ActionBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShareModule
  ]
})
export class ActionBarModule {
}
