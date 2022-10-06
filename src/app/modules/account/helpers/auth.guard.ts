﻿import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngxs/store";
import { AuthState } from "@modules/google-signin/store/auth.state";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
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
