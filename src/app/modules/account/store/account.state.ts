import { State } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { User } from "@account/store/user.model";

export interface AccountStateModel {
  user: User | null;
}

@State<AccountStateModel>({
  name: 'Account',
  defaults: {
    user: null,
  }
})

@Injectable()
export class AccountState {

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

}
