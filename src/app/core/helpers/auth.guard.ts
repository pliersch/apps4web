import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {SocialAuthService} from '@abacritt/angularx-social-login';
import {AccountService} from "@modules/account/services/account.service";
import {Store} from "@ngxs/store";
import {AuthService} from "@modules/user-managaer/services/auth.service";
import {AuthState} from "@modules/user-managaer/store/auth-state";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private accountService: AccountService,
              private tmpService: AuthService,
              private store: Store,
              private authService: SocialAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      return true;
    }
    this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  // VERY OLD

  /*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const account = this.accountService.accountValue;
      if (account) {
        // check if route is restricted by role
        if (route.data.roles && !route.data.roles.includes(account.role)) {
          // role not authorized so redirect to home page
          this.router.navigate(['/']);
          return false;
        }

        // authorized so return true
        return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return false;
    } */
}
