import { Injectable } from "@angular/core";
import { SetCheckedInstruction } from "@app/core/stores/app/app.actions";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { insertItem, patch } from "@ngxs/store/operators";

interface AppStateModel {
  checkedInstructions: string[];
}

@State<AppStateModel>({
  name: 'Application',
  defaults: {
    checkedInstructions: []
  }
})

@Injectable()
export class AppState {

  @Selector()
  static getCheckedInstructions(state: AppStateModel): string[] {
    return state.checkedInstructions;
  }

  @Action(SetCheckedInstruction)
  setCheckedInstruction(ctx: StateContext<AppStateModel>, action: SetCheckedInstruction): void {
    ctx.setState(
      patch({
        checkedInstructions: insertItem<string>(action.pageName)
      })
    );
  }

}
