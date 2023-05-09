import { Injectable } from "@angular/core";
import * as routerAction from "@app/core/stores/routes/router.actions";
import { Role } from "@modules/admin/modules/user/store/role";
import { Action, Selector, State, StateContext } from "@ngxs/store";

export interface Route {
  path: string;
  name: string;
  accepted: Role;
}

interface RouterStateModel {
  routes: Route[];
  routeBeforeSignin: string;
  role: Role;
}

@State<RouterStateModel>({
  name: 'Routes',
  defaults: {
    role: Role.Guest,
    routeBeforeSignin: '',
    routes: [
      // {path: '', name: 'Home', accepted: Role.User},
      {path: 'gallery', name: 'Galerie', accepted: Role.User},
      {path: 'chat', name: 'Chat', accepted: Role.User},
      {path: 'three', name: 'Three', accepted: Role.User},
      {path: 'account', name: 'Account', accepted: Role.Admin},
      {path: 'admin', name: 'Admin', accepted: Role.Admin},
    ]
  }
})

@Injectable()
export class RouterState {

  @Selector()
  static getRouteBeforeSignin(state: RouterStateModel): string {
    return state.routeBeforeSignin;
  }

  @Selector()
  static getAccessibleRoutes(state: RouterStateModel): Route[] {
    const accessibleRoutes: Route[] = [];
    for (const route of state.routes) {
      if (state.role >= route.accepted) {
        accessibleRoutes.push(route);
      }
    }
    return accessibleRoutes;
  }

  @Action(routerAction.SetUserRole)
  setRole(ctx: StateContext<RouterStateModel>, action: routerAction.SetUserRole): void {
    ctx.patchState({
      role: action.role
    });
  }

  @Action(routerAction.SetRouteBeforeSignin)
  setRouteBeforeSignin(ctx: StateContext<RouterStateModel>, action: routerAction.SetRouteBeforeSignin): void {
    ctx.patchState({
      routeBeforeSignin: action.url
    });
  }

}
