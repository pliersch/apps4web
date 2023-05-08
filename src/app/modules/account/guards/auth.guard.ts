import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { SetRouteBeforeSignin } from "@app/core/stores/routes/router.actions";
import { RouterState } from "@app/core/stores/routes/router.state";
import { Store } from "@ngxs/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard canActivate: ')
    const routes = this.store.selectSnapshot(RouterState.getAccessibleRoutes);
    if (this.canAccessRoute(route, routes)) {
      return true;
    }
    this.store.dispatch(new SetRouteBeforeSignin(state.url))
    void this.router.navigate(['/account/login']);
    return false;
  }

  canAccessRoute(route: ActivatedRouteSnapshot, accessibleRoutes: Route[]): boolean {
    const path = route.routeConfig?.path;
    return !!accessibleRoutes.find(route => route.path === path);
  }

}
