import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-drag-drop-progress',
    templateUrl: './drag-drop-progress.component.html',
    styleUrls: ['./drag-drop-progress.component.scss'],
    standalone: true
})
export class DragDropProgressComponent {

  @Input()
  progress = 0;
}
