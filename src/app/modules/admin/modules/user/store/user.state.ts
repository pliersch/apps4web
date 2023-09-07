import { User } from "@account/store/user.model";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { UserService } from "@modules/admin/modules/user/services/user.service";
import * as userActions from "@modules/admin/modules/user/store/user.actions";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { asapScheduler, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface UserStateModel {
  users: Array<User>;
}

@State<UserStateModel>({
  name: 'Admin_User',
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

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  // region load
  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(userActions.LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>): Observable<User[]> {
    return this.userService.getAll()
      .pipe(
        tap((users: User[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.LoadUsersSuccess(users))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.LoadUsersFail(error))
          )
          return throwError(() => error);
        })
      );
  }

  @Action(userActions.LoadUsersSuccess)
  loadUsersSuccess({patchState}: StateContext<UserStateModel>, action: userActions.LoadUsersSuccess): void {
    patchState({users: action.payload});
  }

  @Action(userActions.LoadUsersFail)
  loadUsersFail(): void {
    this.alertService.error('cant load users')
  }

  // endregion

// region create
//////////////////////////////////////////////////////////
//          create
//////////////////////////////////////////////////////////

  @Action(userActions.CreateUser)
  createUser(ctx: StateContext<UserStateModel>, action: userActions.CreateUser): Observable<User> {
    return this.userService.create(action.dto)
      .pipe(
        tap((user: User) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.CreateUserSuccess(user))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.CreateUserFail(error))
          )
          return throwError(() => error);
        })
      );
  }

  @Action(userActions.CreateUserSuccess)
  createUserSuccess(ctx: StateContext<UserStateModel>, action: userActions.CreateUserSuccess): void {
    const state = ctx.getState();
    ctx.patchState({
      users: [
        ...state.users,
        action.user,
      ],
    });
  }

  @Action(userActions.CreateUserFail)
  createUserFail(): void {
    this.alertService.error('cant create user')
  }

// endregion

// region update
//////////////////////////////////////////////////////////
//          update
//////////////////////////////////////////////////////////

  @Action(userActions.UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: userActions.UpdateUser): Observable<User> {
    return this.userService.update(action.id, action.partialUser)
      .pipe(
        tap((/*typeOrmUpdateVal: any*/) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.UpdateUserSuccess(action.id, action.partialUser))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.UpdateUserFail(error))
          )
          return throwError(() => error);
        })
      );
  }

  @Action(userActions.UpdateUserSuccess)
  updateUserSuccess(ctx: StateContext<UserStateModel>, action: userActions.UpdateUserSuccess):
    void {
    ctx.setState(
      patch({
        users: updateItem<User>(user => user?.id === action.id,
          patch(action.partialUser))
      })
    );
  }

  @Action(userActions.UpdateUserFail)
  updateUserFail(): void {
    this.alertService.error('cant update user')
  }

// endregion

// region delete
//////////////////////////////////////////////////////////
//          delete
//////////////////////////////////////////////////////////

  @Action(userActions.DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: userActions.DeleteUser): Observable<User> {
    return this.userService.delete(action.id)
      .pipe(
        tap(() =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.DeleteUserSuccess(action.id))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.DeleteUserFail(error))
          )
          return throwError(() => error);
        })
      );
  }

  @Action(userActions.DeleteUserSuccess)
  deleteUserSuccess(ctx: StateContext<UserStateModel>, action: userActions.DeleteUserSuccess): void {
    ctx.setState(
      patch({
        users: removeItem<User>(user => user!.id === action.id)
      })
    );
  }

  @Action(userActions.DeleteUserFail)
  deleteUserFail(): void {
    this.alertService.error('cant delete user')
  }

// endregion
}
