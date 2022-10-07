import { Action, Selector, State, StateContext } from '@ngxs/store';
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
export class AuthState {

  @Selector()
  static user(state: AuthStateModel): SocialUser | null {
    return state.socialUser;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.socialUser;
  }

  constructor(private alertService: AlertService) {
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
