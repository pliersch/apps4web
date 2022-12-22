import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { User } from "@account/store/user.model";
import { Status } from "@modules/admin/modules/user/store/status";
import { Role } from "@modules/admin/modules/user/store/role";
import { SetUser } from "@account/store/account.actions";
import { GoogleUser } from "@account/store/google-user.model";
import { AlertService } from "@app/common/services/alert.service";
import { AccountService } from "@account/services/account.service";
import * as authActions from "@account/store/signin.actions";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface AccountStateModel {
  user: User;
  googleUser: GoogleUser | null;
}

@State<AccountStateModel>({
  name: 'Account',
  defaults: {
    googleUser: null,
    user: {
      id: 'not set',
      givenName: 'Gast',
      lastName: 'not set',
      email: 'not set',
      status: Status.accept,
      role: Role.Guest,
      created: new Date(),
      lastLogin: new Date()
    },
  }
})

@Injectable()
export class AccountState {

  @Selector()
  static getUser(state: AccountStateModel): User {
    return state.user;
  }

  @Selector()
  static user(state: AccountStateModel): GoogleUser | null {
    return state.googleUser;
  }

  @Selector()
  static isAuthenticated(state: AccountStateModel): boolean {
    return !!state.googleUser;
  }

  constructor(/*private authService: AuthService,*/
              private alertService: AlertService,
              private signinService: AccountService) {
  }

  // region set user
  //////////////////////////////////////////////////////////
  //         set user
  //////////////////////////////////////////////////////////

  @Action(SetUser)
  setCurrentUser(ctx: StateContext<AccountStateModel>, action: SetUser): void {
    ctx.patchState({
      user: action.user
    });
  }

// endregion

  @Action(authActions.SigninWithGoogle)
  signinWithGoogle(ctx: StateContext<AccountStateModel>, action: authActions.SigninWithGoogle): Observable<Subscription> {
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
  signinWithGoogleSuccess(ctx: StateContext<AccountStateModel>, action: authActions.SigninWithGoogleSuccess): void {
    if (action.user === null) {
      this.alertService.warn("You are not registered");
    } else {
      asapScheduler.schedule(() =>
        ctx.dispatch((new SetUser(action.user))
        ))
    }
  }

  @Action(authActions.SigninWithGoogleFail)
  signinWithGoogleFail(): void {
    this.alertService.error('Signin with Google fail');
  }

  @Action(authActions.SignoutWithGoogle)
  signoutWithGoogle(ctx: StateContext<AccountStateModel>): void {
    ctx.patchState({googleUser: null});
  }

}
