import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
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

  @Action(authActions.LoginWithGoogle)
  loginWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LoginWithGoogle): void {
    ctx.patchState({socialUser: action.payload});
  }

  @Action(authActions.LogoutWithGoogle)
  logoutWithGoogle(ctx: StateContext<AuthStateModel>, action: authActions.LogoutWithGoogle): void {
    ctx.patchState({socialUser: null});
  }

}
