import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from "@app/modules/action-bar/actions";

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent {

  @Input()
  actions: Action[]

  @Output()
  actionEvent = new EventEmitter<Action>();

  onClickAction(action: Action): void {
    this.actionEvent.emit(action);
  }
}
