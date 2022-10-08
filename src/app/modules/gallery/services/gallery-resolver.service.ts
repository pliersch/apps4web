import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { LoadMetaData } from "@gallery/store/photos/photo.actions";

@Injectable({
  providedIn: 'root'
})
export class GalleryResolverService implements Resolve<any> {

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.dispatch(new LoadMetaData())
  }
}
