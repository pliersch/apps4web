import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ToggleAction } from "@modules/themes/stores/toggle-action";

export interface ThemeStateModel {
  theme: string;
}

@State<ThemeStateModel>({
  name: 'Theme',
  defaults: {
    theme: 'dark-theme'
  }
})

@Injectable()
export class ThemeState {

  @Selector()
  static theme(state: ThemeStateModel): string {
    return state.theme;
  }

  @Action(ToggleAction)
  toggle(ctx: StateContext<ThemeStateModel>, action: ToggleAction): void {
    ctx.patchState({theme: action.payload.theme})
  }

}
