import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from "@app/core/interfaces/action";

@Component({
  selector: 'app-photos-action-panel',
  templateUrl: './photos-action-panel.component.html',
  styleUrls: ['./photos-action-panel.component.scss']
})
export class PhotosActionPanelComponent {

  @Input()
  actions: Action[]

  @Output()
  actionEvent = new EventEmitter<Action>();

  onClickAction(action: Action): void {
    this.actionEvent.emit(action);
  }
}
