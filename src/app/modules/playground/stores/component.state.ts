import { Injectable, Type } from "@angular/core";
import { Selector, State } from "@ngxs/store";

export type ComponentCategory = 'appbar' | 'landing' | 'footer'

export interface IComponent {
  type: Type<any>;
  category: ComponentCategory;
}

export interface ComponentStateModel {
  appbar: IComponent[]
  landing: IComponent[];
  footer: IComponent[];
}

@State<ComponentStateModel>({
  name: 'LibraryComponents',
  defaults: {
    appbar: [
      // {type: DefaultAppBarComponent, category: "appbar"}
    ],
    landing: [
      // {type: LandingComponent, category: "landing"},
      // {type: LandingBgImgComponent, category: "landing"},
    ],
    footer: []
  }
})

@Injectable()
export class ComponentState {

  // @Selector()
  // static components(state: ComponentStateModel): IComponent[] {
  //   return state.components;
  // }

  @Selector()
  static getAppbars(state: ComponentStateModel): IComponent[] {
    return state.appbar;
  }

  @Selector()
  static getLandings(state: ComponentStateModel): IComponent[] {
    return state.landing;
  }

  @Selector()
  static getFooter(state: ComponentStateModel): IComponent[] {
    return state.footer;
  }

  // @Action(ToggleAction)
  // toggle(ctx: StateContext<ComponentStateModel>, action: ToggleAction): void {
  //   ctx.patchState({theme: action.payload.theme})
  // }

}
