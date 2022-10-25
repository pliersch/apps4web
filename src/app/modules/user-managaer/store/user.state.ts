import { User } from "@modules/user-managaer/store/user";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoadUsers, LoadUsersFail, LoadUsersSuccess } from "@modules/user-managaer/store/user.actions";
import { AuthService } from "@modules/account/services/auth.service";

export interface UserStateModel {
  users: Array<User>;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
  }
})

@Injectable()
export class UserState {

  @Selector()
  static getUsers(state: UserStateModel): User[] {
    return state.users;
  }

  constructor(private authService: AuthService,
              private alertService: AlertService) {
  }

  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>, action: LoadUsers): Observable<Subscription> {
    return of([
      new User(
        'id_test',//this.user.id,
        'Doc',
        'Pat',//this.user.givenName,
        'Test',//this.user.lastName,
        'foo@test.de',//this.user.email,
        'admin'
      ),
    ])
      .pipe(
        map((users: User[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new LoadUsersSuccess(users))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new LoadUsersFail(error))
            )
          )
        )
      );
  }

  @Action(LoadUsersSuccess)
  loadUsersSuccess({patchState}: StateContext<UserStateModel>, action: LoadUsersSuccess): void {
    patchState({users: action.payload});
  }

  @Action(LoadUsersFail)
  loadUsersFail({dispatch}: StateContext<UserStateModel>, action: LoadUsersFail): void {
    this.alertService.error('cant load users')
    console.log(action.error)
  }

}
