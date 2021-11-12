import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { PhotoState } from '@gallery/store/photos/photo.state';


// TODO use Resolver in the future

@Injectable({ providedIn: 'root' })
export class PhotosResolver /*implements Resolve<any>*/ {

  loading = false;

  constructor(private store: Store<PhotoState>) {
    console.log('constructor');
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  // console.log('resolve');
  // return this.store
  //   .pipe(
  //     // select(areCoursesLoaded),
  //     tap(coursesLoaded => {
  //       if (!this.loading && !coursesLoaded) {
  //         console.log('nope');
  //         this.loading = true;
  //         this.store.dispatch(loadPhotos());
  //       }
  //     }),
  //     // filter(coursesLoaded => coursesLoaded),
  //     first(),
  //     finalize(() => {
  //       console.log('foo');
  //       this.loading = false;
  //     })
  //   );
  // }
}
