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
  role: Role;
}

@State<RouterStateModel>({
  name: 'Routes',
  defaults: {
    role: Role.Guest,
    routes: [
      {path: '/gallery', name: 'Galerie', accepted: Role.User},
      {path: '/chat', name: 'Chat', accepted: Role.User},
      {path: '/three', name: 'Three', accepted: Role.Guest},
      {path: '/account', name: 'Account', accepted: Role.User},
      {path: '/admin', name: 'Admin', accepted: Role.Admin},
      // {route: '/dashboard', name: 'Dashboard', accepted: Role.Guest},
      // {route: '/recipes', name: 'Rezepte', accepted: Role.Guest},
    ]
  }
})

@Injectable()
export class RouterState {

  @Selector()
  static getRoutes(state: RouterStateModel): Route[] {
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
    })
  }

}
