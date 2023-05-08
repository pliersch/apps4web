import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import * as routerAction from "@app/core/stores/routes/router.actions";
import { Role } from "@modules/admin/modules/user/store/role";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";

interface RouterStateModel {
  routes: Route[];
  accessibleRoutes: Route[];
  routeBeforeSignin: string;
  role: Role;
}

@State<RouterStateModel>({
  name: 'Routes',
  defaults: {
    role: Role.Guest,
    routeBeforeSignin: '',
    accessibleRoutes: [],
    routes: [
      // // {path: '', name: 'Home', accepted: Role.User},
      // {path: 'gallery', name: 'Galerie', accepted: Role.User},
      // {path: 'chat', name: 'Chat', accepted: Role.User},
      // {path: 'three', name: 'Three', accepted: Role.User},
      // {path: 'account', name: 'Account', accepted: Role.Admin},
      // {path: 'admin', name: 'Admin', accepted: Role.Admin},
    ]
  }
})

@Injectable()
export class RouterState implements NgxsOnInit {

  constructor(private router: Router) {
  }

  ngxsOnInit(ctx?: StateContext<any> | undefined): void {
    const routes: Route[] = ctx?.getState().routes;
    this.router.config[0].children?.forEach(route => {
      console.log('RouterState : ', route)
      routes.push(route)
    });
  }

  @Selector()
  static getRouteBeforeSignin(state: RouterStateModel): string {
    return state.routeBeforeSignin;
  }

  @Selector()
  static getAccessibleRoutes(state: RouterStateModel): Route[] {
    return state.accessibleRoutes;
  }

  @Action(routerAction.SetUserRole)
  setRole(ctx: StateContext<RouterStateModel>, action: routerAction.SetUserRole): void {
    const accessibleRoutes = this._findAccessibleRoutes(ctx.getState().routes, action.role);

    ctx.patchState({
      role: action.role,
      accessibleRoutes: accessibleRoutes
    })
  }

  @Action(routerAction.SetRouteBeforeSignin)
  setRouteBeforeSignin(ctx: StateContext<RouterStateModel>, action: routerAction.SetRouteBeforeSignin): void {
    ctx.patchState({
      routeBeforeSignin: action.url
    })
  }

  //////////////////////////////////////////////////////////
  //                   helper
  //////////////////////////////////////////////////////////

  private _findAccessibleRoutes(routes: Route[], role: Role): Route[] {
    const accessibleRoutes: Route[] = [];
    routes.forEach(route => {
      if (this._canAccessRoute(route, role)) {
        accessibleRoutes.push(route);
      }
    });
    return accessibleRoutes;
  }

  private _canAccessRoute(route: Route, role: Role): boolean {
    const guardName = this._findHighestGuardName(route);
    switch (role) {
      case Role.Admin:
        return true;
      case Role.User:
        return guardName != 'AdminGuard';
      case Role.Guest:
        return guardName != '';
    }
    return false;
  }

  private _findHighestGuardName(route: Route): string {
    let guardName = 'AuthGuard';
    route.canActivate?.forEach(cb => {
      if (cb.name === 'AdminGuard') {
        guardName = 'AdminGuard';
      }
    });
    return guardName;
  }
}
