import { Role } from "@modules/admin/modules/user/store/role";

export class SetUserRole {
  static readonly type = '[Router] Set User Role';

  constructor(public readonly role: Role) { }
}
