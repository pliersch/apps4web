import { Action, NgxsAfterBootstrap, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AlertService } from "@app/services/alert.service";
import * as authActions from "@modules/google-signin/store/auth.actions";
import { SocialUser } from "@modules/google-signin/social-user.model";

export interface AuthStateModel {
  socialUser: SocialUser | null;
}

@State<AuthStateModel>({
  name: 'googleAuth',
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

  constructor(private alertService: AlertService) {
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
    ctx.patchState({socialUser: action.payload});
  }

  @Action(authActions.LogoutWithGoogleAction)
  logoutWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogleAction): void {
    ctx.patchState({socialUser: null});
  }

}
