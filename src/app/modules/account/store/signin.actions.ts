import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";

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
