import { Injectable } from '@angular/core';
import { ActionBarHost } from "@modules/action-bar/action-bar-host";
import { Action } from "@modules/action-bar/actions";

@Injectable({
  providedIn: 'root'
})
export class ActionBarService {

  private host: ActionBarHost;

  setHost(host: ActionBarHost): void {
    this.host = host;
  }

  setActions(actions: Action[]): void {
    if (this.host) {
      this.host.setActions(actions);
    }
  }

  removeActions(): void {
    if (this.host) {
      this.host.removeActions();
    }

  }
}
