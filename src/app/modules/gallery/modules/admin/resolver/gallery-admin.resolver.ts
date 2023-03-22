import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoadMetaData } from "@gallery/store/photos/photo.actions";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryAdminResolver implements Resolve<boolean> {

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
