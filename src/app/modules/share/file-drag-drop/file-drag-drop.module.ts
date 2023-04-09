import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { DragDropDirectiveDirective } from './drag-drop-directive.directive';
import { DragDropInputComponent } from './drag-drop-input/drag-drop-input.component';
import { DragDropProgressComponent } from './drag-drop-progress/drag-drop-progress.component';

@NgModule({
  declarations: [
    DragDropInputComponent,
    DragDropDirectiveDirective,
    DragDropProgressComponent
  ],
  exports: [
    DragDropInputComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})

export class FileDragDropModule {
}
