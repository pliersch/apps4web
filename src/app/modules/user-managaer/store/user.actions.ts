export class LoadUsers {
  static readonly type = '[User Manager] Load Users';
}

export class LoadUsersSuccess {
  static readonly type = '[User Manager] Load Users Success';

  constructor(public readonly payload: Array<any>) {
  }
}

export class LoadUsersFail {
  static readonly type = '[User Manager] Load Users Fail';

  constructor(public error: any) {
  }
}
