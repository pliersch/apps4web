import { Role } from "@modules/admin/modules/user/store/role";

export class SetRouteBeforeSignin {
  static readonly type = '[Router] Set Route Before Signin';

  constructor(public readonly url: string) { }
}

export class SetUserRole {
  static readonly type = '[Router] Set User Role';

  constructor(public readonly role: Role) { }
}
