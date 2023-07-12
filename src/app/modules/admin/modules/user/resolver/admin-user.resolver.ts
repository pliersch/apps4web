import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from "@ngxs/store";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { LoadUsers } from "@modules/admin/modules/user/store/user.actions";

@Injectable({
  providedIn: 'root'
})
export class AdminUserResolver  {

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.store.selectSnapshot(UserState.getUsers).length === 0) {
      return this.store.dispatch(new LoadUsers())
    }

    return of(true);
  }
}
