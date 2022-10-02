import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import * as authActions from "@modules/auth/store/auth.actions";
import { AlertService } from "@app/services/alert.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthStateModel {
  user: SocialUser | null;
}

@State<AuthStateModel>({
  name: 'legacy_auth',
  defaults: {
    user: null,
  }
})

@Injectable()
export class AuthState {

  // @Selector()
  // static user(state: AuthStateModel): SocialUser | null {
  //   return state.user;
  // }
  //
  // @Selector()
  // static isAuthenticated(state: AuthStateModel): boolean {
  //   return !!state.user?.authToken;
  // }

  constructor(/*private authService: AuthService,*/
              private socialAuthService: SocialAuthService,
              private alertService: AlertService) {
  }

  // @Action(authActions.LoginAction)
  // login(ctx: StateContext<AuthStateModel>, action: authActions.LoginAction): Observable<{ token: string }> {
  //   return this.authService.login(action.payload).pipe(
  //     tap((result: { token: string }) => {
  //       ctx.patchState({
  //         token: result.token,
  //         username: action.payload.username
  //       });
  //     })
  //   );
  // }
  //
  // @Action(authActions.LogoutAction)
  // logout(ctx: StateContext<AuthStateModel>, action: authActions.LogoutAction): Observable<any> {
  //   const state = ctx.getState();
  //   return this.authService.logout(state.token!).pipe(
  //     tap(() => {
  //       ctx.setState({
  //         token: null,
  //         username: null
  //       });
  //     })
  //   );
  // }

//////////////////////////////////////////////////////////
//          google auth
//////////////////////////////////////////////////////////

  // login

  @Action(authActions.LoginWithGoogleAction)
  loginWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogleAction): void {
    const googleLoginOptions = {
      scope: 'profile email'
    };
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions)
      .then((account) => {
        console.log('AuthState : ', account)
        ctx.dispatch(new authActions.LoginWithGoogleSuccessAction(account));
      }).catch((error: HttpErrorResponse) => {
      ctx.dispatch(new authActions.LoginWithGoogleFailAction(error));
    })
  }

  @Action(authActions.LoginWithGoogleSuccessAction)
  loginWithGoogleSuccess(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogleSuccessAction): void {
    ctx.patchState({user: action.payload});
  }

  @Action(authActions.LoginWithGoogleFailAction)
  loginWithGoogleFailAction(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogleFailAction): void {
    this.alertService.error('Login with Google fail');
    console.log('AuthState : ', action.error)
  }

  @Action(authActions.AutoLoginWithGoogleAction)
  autoLoginWithGoogleAction(ctx: StateContext<AuthStateModel>, action: authActions.AutoLoginWithGoogleAction): void {
    console.log('AuthState autoLoginWithGoogleAction: ', action.payload)
    ctx.patchState({user: action.payload});
  }

  // logout

  @Action(authActions.LogoutWithGoogleAction)
  logoutWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogleAction): void {

    this.socialAuthService.signOut(true)
      .then(() => {
        ctx.dispatch(new authActions.LogoutWithGoogleSuccessAction());
      }).catch((error: HttpErrorResponse) => {
      ctx.dispatch(new authActions.LogoutWithGoogleFailAction(error));
    })
  }

  @Action(authActions.LogoutWithGoogleSuccessAction)
  logoutWithGoogleSuccess(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogleSuccessAction): void {
    ctx.patchState({user: null});
  }

  @Action(authActions.LogoutWithGoogleFailAction)
  logoutWithGoogleFail(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogleFailAction): void {
    this.alertService.error('Logout with Google fail');
    console.log('AuthState : ', action.error)
  }

}
