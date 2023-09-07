import { Injectable } from '@angular/core';
import { LoadMetaData } from "@modules/photos/store/photos/photo.actions";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosAdminResolver {

  private initialized = false;

  constructor(private store: Store) {}

  resolve(): Observable<boolean> {
    if (!this.initialized) {
      this.initialized = true;
      return this.initStore();
    }
    // fixme if backend down, true is bad.
    return of(true);
  }

  private initStore(): Observable<any> {
    return this.store.dispatch(new LoadMetaData());
  }
}
