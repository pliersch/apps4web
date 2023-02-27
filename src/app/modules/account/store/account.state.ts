import * as accountActions from "@account/store/account.actions";
import { LoginWithId, SetUser } from "@account/store/account.actions";
import { AccountService } from "@account/store/account.service";
import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { RouteService } from "@app/common/services/route.service";
import { Role } from "@modules/admin/modules/user/store/role";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface AccountStateModel {
  user: User | null;
  googleUser: GoogleUser | null;
}

@State<AccountStateModel>({
  name: 'Account',
  defaults: {
    googleUser: null,
    user: null,
  }
})

@Injectable()
export class AccountState {

  @Selector()
  static getUser(state: AccountStateModel): User | null {
    return state.user;
  }

  @Selector()
  static getGoogleUser(state: AccountStateModel): GoogleUser | null {
    return state.googleUser;
  }

  @Selector()
  static isAuthenticated(state: AccountStateModel): boolean {
    return !!state.user;
  }

  @Selector()
  static isAdmin(state: AccountStateModel): boolean {
    return state.user?.role === Role.Admin;
  }

  constructor(private alertService: AlertService,
              private routeService: RouteService,
              private accountService: AccountService) {
  }

  @Action(SetUser)
  setCurrentUser(ctx: StateContext<AccountStateModel>, action: SetUser): void {
    ctx.patchState({
      user: action.user
    });
  }

  @Action(LoginWithId)
  loginWithId(ctx: StateContext<AccountStateModel>, action: LoginWithId): Observable<Subscription> {
    return this.accountService.loginWithId(action.id).pipe(
      map((user: User) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new accountActions.LoginWithIdSuccess(user))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new accountActions.LoginWithIdFail(error))
          )
        )
      )
    );
  }

  @Action(accountActions.LoginWithIdSuccess)
  loginWithIdSuccess(ctx: StateContext<AccountStateModel>, action: accountActions.LoginWithIdSuccess): void {
    if (action.user === null) {
      this.alertService.warn("You are not registered");
    } else {
      asapScheduler.schedule(() =>
        ctx.dispatch((new SetUser(action.user))
        ))
      this.routeService.enableAccountRoute();
      if (action.user.role === Role.Admin) {
        this.routeService.enableAdminRoute();
      }
    }
  }

  @Action(accountActions.LoginWithIdFail)
  loginWithIdFail(): void {
    this.alertService.error('Login fail');
  }

  @Action(accountActions.SigninWithGoogle)
  signinWithGoogle(ctx: StateContext<AccountStateModel>, action: accountActions.SigninWithGoogle): Observable<Subscription> {
    ctx.patchState({googleUser: action.user});

    return this.accountService.signin(action.user).pipe(
      map((user: User) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new accountActions.SigninWithGoogleSuccess(user))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new accountActions.SigninWithGoogleFail(error))
          )
        )
      )
    );
  }

  @Action(accountActions.SigninWithGoogleSuccess)
  signinWithGoogleSuccess(ctx: StateContext<AccountStateModel>, action: accountActions.SigninWithGoogleSuccess): void {
    if (action.user === null) {
      this.alertService.warn("You are not registered");
    } else {
      asapScheduler.schedule(() =>
        ctx.dispatch((new SetUser(action.user))
        ))
      this.routeService.enableAccountRoute();
      if (action.user.role === Role.Admin) {
        this.routeService.enableAdminRoute();
      }
    }
  }

  @Action(accountActions.SigninWithGoogleFail)
  signinWithGoogleFail(): void {
    this.alertService.error('Signin with Google fail');
  }

  @Action(accountActions.SignoutWithGoogle)
  signoutWithGoogle(ctx: StateContext<AccountStateModel>): void {
    ctx.patchState({googleUser: null});
    this.routeService.disableAccountRoute();
    this.routeService.disableAdminRoute();
  }

}
