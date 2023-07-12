import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SetRouteBeforeSignin } from "@app/core/stores/routes/router.actions";
import { Store } from "@ngxs/store";

@Injectable({providedIn: 'root'})
export class AdminGuard  {
  constructor(private router: Router,
              private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AccountState.isAdmin)) {
      return true;
    }
    if (this.store.selectSnapshot(AccountState.isUser)) {
      void this.router.navigate(['/error']);
      return false;
    }
    this.store.dispatch(new SetRouteBeforeSignin(state.url))
    void this.router.navigate(['/account/login']);
    return false;
  }

}
