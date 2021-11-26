export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public payload: { username: string; password: string }) {
  }
}
