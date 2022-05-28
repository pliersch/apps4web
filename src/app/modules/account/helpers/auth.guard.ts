import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from "@modules/account/services/account.service";
import { Store } from "@ngxs/store";
import { AuthService } from "@modules/account/services/auth.service";
import { AuthState } from "@modules/account/store/auth.state";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private accountService: AccountService,
              private tmpService: AuthService,
              private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      return true;
    }
    this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
