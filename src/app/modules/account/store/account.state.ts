import * as accountActions from "@account/store/account.actions";
import { LoginWithEmail, SetUser } from "@account/store/account.actions";
import { AccountService } from "@account/store/account.service";
import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { SetUserRole } from "@app/core/stores/routes/router.actions";
import { Role } from "@modules/admin/modules/user/store/role";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, asyncScheduler, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

interface AccountStateModel {
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
  static isUser(state: AccountStateModel): boolean {
    return state.user?.role === (Role.User || Role.Admin);
  }

  @Selector()
  static isAdmin(state: AccountStateModel): boolean {
    return state.user?.role === Role.Admin;
  }

  constructor(private alertService: AlertService,
              private accountService: AccountService) { }

  @Action(SetUser)
  setCurrentUser(ctx: StateContext<AccountStateModel>, action: SetUser): void {
    ctx.patchState({
      user: action.user
    });
  }

  @Action(LoginWithEmail)
  loginWithPassword(ctx: StateContext<AccountStateModel>, action: LoginWithEmail): Observable<User> {
    return this.accountService.loginWithEmail(action.email, action.password)
      .pipe(
        tap(user =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new accountActions.LoginSuccess(user)))),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new accountActions.LoginFail(error)))
          return throwError(() => error);
        })
      );
  }

  @Action(accountActions.LoginWithGoogle, {cancelUncompleted: true})
  signinWithGoogle(ctx: StateContext<AccountStateModel>, action: accountActions.LoginWithGoogle): Observable<User> {
    ctx.patchState({googleUser: action.user});
    return this.accountService.signin(action.user).pipe(
      tap(user => asapScheduler.schedule(() =>
        ctx.dispatch(new accountActions.LoginSuccess(user)))),
      catchError(error => {
        asapScheduler.schedule(() => ctx.dispatch(new accountActions.LoginFail(error)))
        return throwError(() => error);
      })
    )
  }

  @Action(accountActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AccountStateModel>, action: accountActions.LoginSuccess): void {
    if (action.user === null) {
      this.alertService.warn("Du bist nicht registriert");
    } else {
      asyncScheduler.schedule(() =>
        ctx.dispatch(new SetUserRole(action.user.role))
      )
      asyncScheduler.schedule(() =>
        ctx.dispatch(new SetUser(action.user))
      )
    }
  }

  @Action(accountActions.LoginFail)
  loginFail(): void {
    this.alertService.error('Login fehlgeschlagen');
  }

  @Action(accountActions.Logout)
  logOut(ctx: StateContext<AccountStateModel>): void {
    ctx.patchState({googleUser: null, user: null});
    ctx.dispatch(new SetUserRole(Role.Guest));
  }

}
