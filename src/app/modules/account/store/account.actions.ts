import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";

export class SetUser {
  static readonly type = '[Account] Set User';

  constructor(public readonly user: User) { }
}

export class LoginWithEmail {
  static readonly type = '[Account] Login Email';

  constructor(public readonly email: string,
              public readonly password: string) { }
}

export class LoginWithGoogle {
  static readonly type = '[Account] Google Login';

  constructor(public readonly user: GoogleUser) { }
}

export class LoginSuccess {
  static readonly type = '[Account] Login Success';

  constructor(public readonly user: User) { }
}

export class LoginFail {
  static readonly type = '[Account] Login Fail';

  constructor(public error: string) { }
}

export class Logout {
  static readonly type = '[Account] Logout';
}
