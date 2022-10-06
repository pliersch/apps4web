import { SocialUser } from "@modules/google-signin/social-user.model";

//////////////////////////////////////////////////////////
//          google login
//////////////////////////////////////////////////////////

export class LoginWithGoogleAction {
  static readonly type = '[Auth] Google Login';

  constructor(public readonly payload: SocialUser) { }
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

  constructor(public error: string) {
  }
}

export class LogoutWithGoogleAction {
  static readonly type = '[Auth] Google Logout';
}

