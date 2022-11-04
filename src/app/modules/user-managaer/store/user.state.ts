import { User } from "@modules/user-managaer/store/user";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoadUsers, LoadUsersFail, LoadUsersSuccess } from "@modules/user-managaer/store/user.actions";
import { AuthService } from "@modules/account/services/auth.service";
import { Role } from "@modules/user-managaer/store/role";
import { Status } from "@modules/user-managaer/store/status";

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

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>, action: LoadUsers): Observable<Subscription> {
    const user: User = {
      id: '1826f1d2-6203-4865-9478-1750cf5060c1',
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
    patchState({users: action.payload, user: action.payload[0]});
  }

  @Action(LoadUsersFail)
  loadUsersFail(action: LoadUsersFail): void {
    this.alertService.error('cant load users')
    console.log(action.error)
  }

}
