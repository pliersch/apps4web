import { SocialUser } from "@modules/google-signin/social-user.model";

//////////////////////////////////////////////////////////
//          google login
//////////////////////////////////////////////////////////

export class LoginWithGoogle {
  static readonly type = '[Auth] Google Login';

  constructor(public readonly payload: SocialUser) { }
}

export class LoginWithGoogleSuccess {
  static readonly type = '[Auth] Google Login Success';

  constructor(public readonly payload: SocialUser) {
  }
}

export class LoginWithGoogleFail {
  static readonly type = '[Auth] Google Login Fail';

  constructor(public error: string) {
  }
}

export class LogoutWithGoogle {
  static readonly type = '[Auth] Google Logout';
}

