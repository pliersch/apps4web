import { HttpErrorResponse } from '@angular/common/http';
import { CreateUserDto, User } from "@modules/admin/modules/user/store/user.model";
import { GoogleUser } from "@modules/google-signin/google-user.model";

export class CreateUser {
  static readonly type = '[User] Create User';

  constructor(public readonly dto: CreateUserDto) { }
}

export class CreateUserSuccess {
  static readonly type = '[User] Create User Success';

  constructor(public readonly user: User) {
  }
}

export class CreateUserFail {
  static readonly type = '[User] Create User Fail';

  constructor(public error: string) {
  }
}

export class UpdateUser {
  static readonly type = '[User] Update User';

  constructor(public readonly id: string, public readonly partialUser: Partial<User>) { }
}

export class UpdateUserSuccess {
  static readonly type = '[User] Update User Success';

  constructor(public readonly id: string, public readonly partialUser: Partial<User>) {
  }
}

export class UpdateUserFail {
  static readonly type = '[User] Update User Fail';

  constructor(public error: string) {
  }
}

export class DeleteUser {
  static readonly type = '[User] Delete User';

  constructor(public readonly id: string) { }
}

export class DeleteUserSuccess {
  static readonly type = '[User] Delete User Success';

  constructor(public readonly id: string) {
  }
}

export class DeleteUserFail {
  static readonly type = '[User] Delete User Fail';

  constructor(public error: string) {
  }
}

export class SetCurrentUser {
  static readonly type = '[User] Set Current';

  constructor(public readonly user: User) { }
}

export class LoadUsers {
  static readonly type = '[User] Load Users';
}

export class LoadUsersSuccess {
  static readonly type = '[User] Load Users Success';

  constructor(public readonly payload: User[]) {
  }
}

export class LoadUsersFail {
  static readonly type = '[User] Load Users Fail';

  constructor(public error: HttpErrorResponse) {
  }
}
