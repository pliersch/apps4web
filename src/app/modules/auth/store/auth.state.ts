import { Action, NgxsAfterBootstrap, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AlertService } from "@app/services/alert.service";
import * as authActions from "@modules/auth/store/auth.actions";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthStateModel {
  socialUser: SocialUser | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    socialUser: null,
  }
})

@Injectable()
export class AuthState implements NgxsOnInit, NgxsAfterBootstrap {

  @Selector()
  static user(state: AuthStateModel): SocialUser | null {
    return state.socialUser;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.socialUser?.authToken;
  }

  constructor(private socialAuthService: SocialAuthService,
              private alertService: AlertService) {
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    console.log('AuthState ngxsOnInit: ', ctx.getState())
  }

  ngxsAfterBootstrap(ctx: StateContext<AuthStateModel>): void {
    console.log('AuthState ngxsAfterBootstrap: ', ctx.getState())
  }

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
    ctx.patchState({socialUser: action.payload});
  }

  @Action(authActions.LoginWithGoogleFailAction)
  loginWithGoogleFailAction(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogleFailAction): void {
    this.alertService.error('Login with Google fail');
    console.log('AuthState : ', action.error)
  }

  @Action(authActions.AutoLoginWithGoogleAction)
  autoLoginWithGoogleAction(ctx: StateContext<AuthStateModel>, action: authActions.AutoLoginWithGoogleAction): void {
    console.log('AuthState autoLoginWithGoogleAction: ', action.payload)
    ctx.patchState({socialUser: action.payload});
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
    ctx.patchState({socialUser: null});

  }

  @Action(authActions.LogoutWithGoogleFailAction)
  logoutWithGoogleFail(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogleFailAction): void {
    this.alertService.error('Logout with Google fail');
    console.log('AuthState : ', action.error)
  }

}
