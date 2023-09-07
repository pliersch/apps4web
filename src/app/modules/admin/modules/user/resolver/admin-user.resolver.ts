import { inject } from '@angular/core';
import { ResolveFn } from "@angular/router";
import { LoadUsers } from "@modules/admin/modules/user/store/user.actions";
import { Store } from "@ngxs/store";

export const adminUserResolver: ResolveFn<void> =
  (/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/) => {
    return inject(Store).dispatch(new LoadUsers())
  };
