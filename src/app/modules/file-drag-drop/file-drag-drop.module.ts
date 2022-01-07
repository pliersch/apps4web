import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropInputComponent} from './drag-drop-input/drag-drop-input.component';
import {DragDropDirectiveDirective} from './drag-drop-directive.directive';
import {DragDropProgressComponent} from './drag-drop-progress/drag-drop-progress.component';

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
    CommonModule
  ]
})

export class FileDragDropModule {
}
