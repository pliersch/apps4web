import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SetRouteBeforeSignin } from "@app/core/stores/routes/router.actions";
import { Store } from "@ngxs/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AccountState.isAuthenticated)) {
      return true;
    }
    this.store.dispatch(new SetRouteBeforeSignin(state.url))
    void this.router.navigate(['/account/login']);
    return false;
  }

}
