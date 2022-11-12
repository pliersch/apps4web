import { GoogleUser } from "@modules/google-signin/google-user.model";
import { User } from "@modules/admin/modules/user/store/user";

export class SigninWithGoogle {
  static readonly type = '[Google Signin] Google Login';

  constructor(public readonly user: GoogleUser) { }
}

export class SigninWithGoogleSuccess {
  static readonly type = '[Google Signin] Google Login Success';

  constructor(public readonly user: User) {
  }
}

export class SigninWithGoogleFail {
  static readonly type = '[Google Signin] Google Login Fail';

  constructor(public error: string) {
  }
}

export class SignoutWithGoogle {
  static readonly type = '[Google Signin] Google Logout';
}

