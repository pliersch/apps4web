import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "@account/services/auth.service";
import { User } from "./user";
import { Status } from "@modules/admin/modules/user/store/status";
import { Role } from "@modules/admin/modules/user/store/role";
import * as userActions from "@modules/admin/modules/user/store/user.actions";

export interface UserStateModel {
  user: User;
  users: Array<User>;
}

@State<UserStateModel>({
  name: 'UserState',
  defaults: {
    user: {
      id: 'not set',
      givenName: 'Gast',
      lastName: 'not set',
      email: 'not set',
      status: Status.accept,
      role: Role.Guest,
      photoUrl: 'not set',
      lastLogin: new Date()
    },
    users: [],
  }
})

@Injectable()
export class UserState {

  @Selector()
  static getUser(state: UserStateModel): User {
    return state.user;
  }

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

  @Action(userActions.LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>, action: userActions.LoadUsers): Observable<Subscription> {
    const user: User = {
      id: '676a2fc0-31e0-4902-980e-64ed6be8877a',
      givenName: 'Patrick',
      lastName: 'Liersch',
      email: 'hourby@gmail.com',
      status: Status.accept,
      role: Role.Admin,
      photoUrl: '',
      lastLogin: new Date()
    }

    return of([
      user,
    ])
      .pipe(
        map((users: User[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.LoadUsersSuccess(users))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new userActions.LoadUsersFail(error))
            )
          )
        )
      );
  }

  @Action(userActions.LoadUsersSuccess)
  loadUsersSuccess({patchState}: StateContext<UserStateModel>, action: userActions.LoadUsersSuccess): void {
    patchState({users: action.payload, user: action.payload[0]});
  }

  @Action(userActions.LoadUsersFail)
  loadUsersFail(action: userActions.LoadUsersFail): void {
    this.alertService.error('cant load users')
    console.log(action.error)
  }

}
