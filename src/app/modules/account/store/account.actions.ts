import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";

export class SetUser {
  static readonly type = '[Account] Set User';

  constructor(public readonly user: User) { }
}

export class LoginWithId {
  static readonly type = '[Account] Login';

  constructor(public readonly id: string) { }
}

export class LoginWithIdSuccess {
  static readonly type = '[Account] Login Success';

  constructor(public readonly user: User) {
  }
}

export class LoginWithIdFail {
  static readonly type = '[Account] Login Fail';

  constructor(public error: string) {
  }
}

export class Logout {
  static readonly type = '[Account] Logout';
}

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

