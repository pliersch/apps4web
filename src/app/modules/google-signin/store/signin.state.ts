import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import * as authActions from "@modules/google-signin/store/signin.actions";
import { GoogleUser } from "@modules/google-signin/google-user.model";
import { SigninService } from "@modules/google-signin/services/signin.service";
import { User } from "@modules/user-managaer/store/user";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";

export interface SigninStateModel {
  googleUser: GoogleUser | null;
}

@State<SigninStateModel>({
  name: 'googleSignin',
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
              private signinService: SigninService) {
  }

  @Action(authActions.SigninWithGoogle)
  loginWithGoogle(ctx: StateContext<SigninStateModel>, action: authActions.SigninWithGoogle): Observable<Subscription> {
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
  loginWithGoogleSuccess(ctx: StateContext<SigninStateModel>, action: authActions.SigninWithGoogleSuccess): void {
    if (action.user === null) {
      this.alertService.warn("You are not registered");
    }
    console.log('AuthState loginWithGoogleSuccess: ', action.user)
  }

  @Action(authActions.SigninWithGoogleFail)
  loginWithGoogleFail(action: authActions.SigninWithGoogleFail): void {
    console.log('SigninState loginWithGoogleFail: ', action.error)
    this.alertService.error('Login with Google fail');
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
