import { HttpErrorResponse } from '@angular/common/http';
import { CreateUserDto, User } from "@modules/admin/modules/user/store/user.model";

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

// export class Login {
//   static readonly type = '[Auth] Login';
//
//   constructor(public readonly user: GoogleUser) { }
// }
//
// export class LoginSuccess {
//   static readonly type = '[Auth] Login Success';
//
//   constructor(public readonly user: User) {
//   }
// }
//
// export class LoginFail {
//   static readonly type = '[Auth] Login Fail';
//
//   constructor(public error: string) {
//   }
// }

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
