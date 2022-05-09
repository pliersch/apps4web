import {Injectable} from '@angular/core';
import {Actions, Effect, EffectNotification, ofType, OnRunEffects} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {concatMap, exhaustMap, map, takeUntil} from 'rxjs/operators';
import {AppActionTypes, UsersLoaded} from '@app/stores/app/app.store.actions';
import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import {User} from "@app/models/user";

@Injectable()
export class LoaderEffect implements OnRunEffects {
  private user: User;

  @Effect()
  loadUser$ = this.actions$.pipe(ofType(AppActionTypes.LoadUsers)).pipe(
    concatMap((action) => {
      return of([
        new User(
          this.user.id,
          'Doc',
          this.user.givenName,
          this.user.lastName,
          this.user.email,
          'admin'
        ),
      ]);
    }),
    map((result: Array<any>) => {
      return new UsersLoaded(result);
    })
  );

  constructor(public actions$: Actions,
              authService: SocialAuthService,
  ) {
    // @ts-ignore
    authService.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$.pipe(
      ofType(AppActionTypes.StartAppInitializer),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(
            this.actions$.pipe(ofType(AppActionTypes.FinishAppInitializer))
          )
        )
      )
    );
  }
}
