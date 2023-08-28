import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from "@app/core/interfaces/action";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-photos-action-panel',
    templateUrl: './photos-action-panel.component.html',
    styleUrls: ['./photos-action-panel.component.scss'],
    standalone: true,
    imports: [MatCardModule, NgFor, MatButtonModule, MatIconModule]
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
