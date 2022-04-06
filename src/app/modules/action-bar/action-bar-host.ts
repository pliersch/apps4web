import {Action} from "@app/models/actions";

export interface ActionBarHost {

  setActions(actions: Action[]): void

  removeActions(): void
}
