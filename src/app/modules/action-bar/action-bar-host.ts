import { Action } from "@modules/action-bar/actions";

export interface ActionBarHost {

  setActions(actions: Action[]): void

  removeActions(): void
}
