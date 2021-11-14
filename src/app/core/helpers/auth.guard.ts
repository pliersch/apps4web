import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {AccountService} from "@modules/account/services/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private accountService: AccountService,
              private authService: SocialAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.authState.subscribe((user) => {
      if (user) {
        return true;
      }
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return false;
    });
    return true;
  }
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
