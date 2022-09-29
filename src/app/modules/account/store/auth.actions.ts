import { HttpErrorResponse } from "@angular/common/http";
import { SocialUser } from "@abacritt/angularx-social-login";

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

//////////////////////////////////////////////////////////
//          google login
//////////////////////////////////////////////////////////


export class LoginWithGoogleAction {
  static readonly type = '[Auth] Google Login';

}

export class LoginWithGoogleSuccessAction {
  static readonly type = '[Auth] Google Login Success';

  constructor(public readonly payload: SocialUser) {
  }
}

export class LoginWithGoogleFailAction {
  static readonly type = '[Auth] Google Login Fail';

  constructor(public error: HttpErrorResponse) {
  }
}

export class LogoutWithGoogleAction {
  static readonly type = '[Auth] Google Logout';
}

export class LogoutWithGoogleSuccessAction {
  static readonly type = '[Auth] Google Logout Success';

}

export class LogoutWithGoogleFailAction {
  static readonly type = '[Auth] Google Logout Fail';

  constructor(public error: HttpErrorResponse) {
  }
}
