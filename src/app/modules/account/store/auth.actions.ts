import { HttpErrorResponse } from "@angular/common/http";

export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public payload: { username: string; password: string }) {
  }
}

export class LoginSuccessAction {
  static readonly type = '[Auth] Login Success';

  constructor(public readonly payload: Array<any>) {
  }
}

export class LoginFailAction {
  static readonly type = '[Auth] Login Fail';

  constructor(public error: HttpErrorResponse) {
  }
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
}

export class LogoutSuccessAction {
  static readonly type = '[Auth] Logout Success';

  constructor(public readonly payload: Array<any>) {
  }
}

export class LogoutFailAction {
  static readonly type = '[Auth] Logout Fail';

  constructor(public error: HttpErrorResponse) {
  }
}
