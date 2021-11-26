import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ThemeStateModel} from "@modules/themes/stores/theme-state-model";
import {Injectable} from "@angular/core";
import {ThemeService} from "@modules/themes/services/theme.service";
import {ToggleAction} from "@modules/themes/stores/toggle-action";

@State<ThemeStateModel>({
  name: 'theme',
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

  constructor(private themeService: ThemeService) {
  }

  @Action(ToggleAction)
  toggle(ctx: StateContext<ThemeStateModel>, action: ToggleAction) {
    ctx.patchState({theme: action.payload.theme})
    return this.themeService.toggleTheme(action.payload.theme);
  }

}
