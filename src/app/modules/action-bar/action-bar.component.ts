import { Component } from '@angular/core';
import { ActionBarHost } from "@modules/action-bar/action-bar-host";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { Action } from "@modules/action-bar/actions";

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements ActionBarHost {

  actions: Action[] = [];

  constructor(private actionBarService: ActionBarService) {
    this.actionBarService.setHost(this);
  }

  removeActions(): void {
    this.actions = [];
  }

  setActions(actions: Action[]): void {
    this.actions = actions;
  }

  onClickAction(item: Action): void {
    item.handler.onAction(item);
  }
}
