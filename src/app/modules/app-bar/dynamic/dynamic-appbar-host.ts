import {Type} from "@angular/core";

export interface DynamicAppbarHost {
  switchAppbar(appbar: Type<any>): void

  removeAppbar(): void
}
