import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from "@modules/action-bar/actions";

@Component({
  selector: 'app-gallery-action-panel',
  templateUrl: './gallery-action-panel.component.html',
  styleUrls: ['./gallery-action-panel.component.scss']
})
export class GalleryActionPanelComponent {

  @Input()
  actions: Action[]

  @Output()
  actionEvent = new EventEmitter<Action>();

  onClickAction(action: Action): void {
    this.actionEvent.emit(action);
  }
}
