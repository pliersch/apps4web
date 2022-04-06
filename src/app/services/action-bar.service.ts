import {Injectable} from '@angular/core';
import {Action} from "@app/models/actions";
import {ActionBarHost} from "@modules/action-bar/action-bar-host";

@Injectable({
  providedIn: 'root'
})
export class ActionBarService {

  private host: ActionBarHost;

  constructor() {
  }

  setHost(host: ActionBarHost): void {
    this.host = host;
  }

  setActions(actions: Action[]): void {
    this.host.setActions(actions);
  }

  removeActions(): void {
    this.host.removeActions();
  }
}
