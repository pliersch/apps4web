import { HttpErrorResponse } from '@angular/common/http';
import { User } from "@modules/user-managaer/store/user";
import { GoogleUser } from "@modules/google-signin/google-user.model";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public readonly user: GoogleUser) { }
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';

  constructor(public readonly user: User) {
  }
}

export class LoginFail {
  static readonly type = '[Auth] Login Fail';

  constructor(public error: string) {
  }
}

export class LoadUsers {
  static readonly type = '[User Manager] Load Users';
}

export class LoadUsersSuccess {
  static readonly type = '[User Manager] Load Users Success';

  constructor(public readonly payload: User[]) {
  }
}

export class LoadUsersFail {
  static readonly type = '[User Manager] Load Users Fail';

  constructor(public error: HttpErrorResponse) {
  }
}
