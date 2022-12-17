import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import * as authActions from "@modules/google-signin/store/signin.actions";
import { GoogleUser } from "@modules/google-signin/google-user.model";
import { SigninService } from "@modules/google-signin/services/signin.service";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { User } from "@modules/admin/modules/user/store/user.model";
import { LoadUsers, SetCurrentUser } from "@modules/admin/modules/user/store/user.actions";

export interface SigninStateModel {
  googleUser: GoogleUser | null;
}

@State<SigninStateModel>({
  name: 'GoogleSignin',
  defaults: {
    googleUser: null,
  }
})

@Injectable()
export class SigninState {

  @Selector()
  static user(state: SigninStateModel): GoogleUser | null {
    return state.googleUser;
  }

  @Selector()
  static isAuthenticated(state: SigninStateModel): boolean {
    return !!state.googleUser;
  }

  constructor(private alertService: AlertService,
              private signinService: SigninService,
              private store: Store) {
  }

  @Action(authActions.SigninWithGoogle)
  signinWithGoogle(ctx: StateContext<SigninStateModel>, action: authActions.SigninWithGoogle): Observable<Subscription> {
    ctx.patchState({googleUser: action.user});

    return this.signinService.signin(action.user).pipe(
      map((user: User) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new authActions.SigninWithGoogleSuccess(user))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new authActions.SigninWithGoogleFail(error))
          )
        )
      )
    );
  }

  @Action(authActions.SigninWithGoogleSuccess)
  signinWithGoogleSuccess(ctx: StateContext<SigninStateModel>, action: authActions.SigninWithGoogleSuccess): void {
    if (action.user === null) {
      this.alertService.warn("You are not registered");
    } else {
      asapScheduler.schedule(() =>
        ctx.dispatch(new LoadUsers())
      )
      asapScheduler.schedule(() =>
        ctx.dispatch((new SetCurrentUser(action.user))
        ))
      // this.store.dispatch(new LoadUsers())
      // this.store.dispatch(new SetCurrentUser(action.user));
    }
  }

  @Action(authActions.SigninWithGoogleFail)
  signinWithGoogleFail(action: authActions.SigninWithGoogleFail): void {
    this.alertService.error('Signin with Google fail');
  }

  // @Action(authActions.LoginWithGoogle)
  // loginWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogle): void {
  //   ctx.patchState({socialUser: action.user});
  //   this.signinService.signin(action.user).pipe(
  //     map((user: User) => console.log(user))
  //   );
  // }

  @Action(authActions.SignoutWithGoogle)
  logoutWithGoogle(ctx: StateContext<SigninStateModel>): void {
    ctx.patchState({googleUser: null});
  }

}
