import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoadMetaData } from "@modules/photos/store/photos/photo.actions";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosAdminResolver  {

  private initialized = false;

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.initialized) {
      this.initStore();
      this.initialized = true;
    }
    return of(true);
  }

  private initStore(): Observable<any> {
    return this.store.dispatch(new LoadMetaData());
    // return of(Subscription.EMPTY).pipe( // yes, I know. but more readable ;)
    //   concatMap(() => this.store.dispatch(new LoadMetaData())),
    //   concatMap(() => this.store.dispatch(new LoadTags())))
    //   .subscribe();
  }
}
