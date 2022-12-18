import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { User } from "@account/store/user.model";
import { Status } from "@modules/admin/modules/user/store/status";
import { Role } from "@modules/admin/modules/user/store/role";
import * as userActions from "@modules/admin/modules/user/store/user.actions";
import { UserService } from "@modules/admin/modules/user/services/user.service";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";

export interface UserStateModel {
  user: User;
  users: Array<User>;
}

@State<UserStateModel>({
  name: 'Admin_User',
  defaults: {
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

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  // region load
  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(userActions.LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>): Observable<Subscription> {
    return this.userService.getAll()
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
    patchState({users: action.payload});
  }

  @Action(userActions.LoadUsersFail)
  loadUsersFail(): void {
    this.alertService.error('cant load users')
  }

  // endregion

  // region set current
  //////////////////////////////////////////////////////////
  //         set current
  //////////////////////////////////////////////////////////

  @Action(userActions.SetCurrentUser)
  setCurrentUser(ctx: StateContext<UserStateModel>, action: userActions.SetCurrentUser): void {
    ctx.patchState({
      user: action.user
    });
  }

// endregion

// region create
//////////////////////////////////////////////////////////
//          create
//////////////////////////////////////////////////////////

  @Action(userActions.CreateUser)
  createUser(ctx
               :
               StateContext<UserStateModel>, action
               :
               userActions.CreateUser
  ):
    Observable<Subscription> {
    return this.userService.create(action.dto)
      .pipe(
        map((user: User) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.CreateUserSuccess(user))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new userActions.CreateUserFail(error))
            )
          )
        )
      );
  }

  @Action(userActions.CreateUserSuccess)
  createUserSuccess(ctx
                      :
                      StateContext<UserStateModel>, action
                      :
                      userActions.CreateUserSuccess
  ):
    void {
    const state = ctx.getState();
    ctx.patchState({
      users: [
        ...state.users,
        action.user,
      ],
    });
  }

  @Action(userActions.CreateUserFail)
  createUserFail()
    :
    void {
    this.alertService.error('cant create user')
  }

// endregion

// region update
//////////////////////////////////////////////////////////
//          update
//////////////////////////////////////////////////////////

  @Action(userActions.UpdateUser)
  updateUser(ctx
               :
               StateContext<UserStateModel>, action
               :
               userActions.UpdateUser
  ):
    Observable<Subscription> {
    return this.userService.update(action.id, action.partialUser)
      .pipe(
        map((typeOrmUpdateVal: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.UpdateUserSuccess(action.id, action.partialUser))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new userActions.UpdateUserFail(error))
            )
          )
        )
      );
  }

  @Action(userActions.UpdateUserSuccess)
  updateUserSuccess(ctx
                      :
                      StateContext<UserStateModel>, action
                      :
                      userActions.UpdateUserSuccess
  ):
    void {
    ctx.setState(
      patch({
        users: updateItem<User>(user => user?.id === action.id,
          patch(action.partialUser))
      })
    );
  }

  @Action(userActions.UpdateUserFail)
  updateUserFail()
    :
    void {
    this.alertService.error('cant update user')
  }

// endregion

// region delete
//////////////////////////////////////////////////////////
//          delete
//////////////////////////////////////////////////////////

  @Action(userActions.DeleteUser)
  deleteUser(ctx
               :
               StateContext<UserStateModel>, action
               :
               userActions.DeleteUser
  ):
    Observable<Subscription> {
    return this.userService.delete(action.id)
      .pipe(
        map(() =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new userActions.DeleteUserSuccess(action.id))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new userActions.DeleteUserFail(error))
            )
          )
        )
      );
  }

  @Action(userActions.DeleteUserSuccess)
  deleteUserSuccess(ctx
                      :
                      StateContext<UserStateModel>, action
                      :
                      userActions.DeleteUserSuccess
  ):
    void {
    ctx.setState(
      patch({
        users: removeItem<User>(user => user!.id === action.id)
      })
    );
  }

  @Action(userActions.DeleteUserFail)
  deleteUserFail()
    :
    void {
    this.alertService.error('cant delete user')
  }

// endregion
}
