import { HttpErrorResponse } from "@angular/common/http";
import { SocialUser } from "@abacritt/angularx-social-login";

//////////////////////////////////////////////////////////
//          google login
//////////////////////////////////////////////////////////

export class LoginWithGoogleAction {
  static readonly type = '[Auth] Google Login';
}

export class AutoLoginWithGoogleAction {
  static readonly type = '[Auth] Google Auto Login';

  constructor(public readonly payload: SocialUser) {
  }
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
