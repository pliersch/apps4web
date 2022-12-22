import { User } from "@account/store/user.model";

export class SetUser {
  static readonly type = '[Account] Set User';

  constructor(public readonly user: User) { }
}


