import { Status } from "@modules/admin/modules/user/store/status";
import { Role } from "@modules/admin/modules/user/store/role";

export interface User {
  id: string,
  givenName: string,
  lastName: string,
  email: string,
  role: Role,
  photoUrl: string;
  status: Status;
  created: Date;
  lastLogin: Date;
}
