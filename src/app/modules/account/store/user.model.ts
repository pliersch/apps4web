import { Role } from "@modules/admin/modules/user/store/role";
import { Status } from "@modules/admin/modules/user/store/status";

export interface User {
  id: string,
  givenName: string,
  surName: string,
  email: string,
  role: Role,
  status: Status;
  created: Date;
  lastLogin: Date;
}

export interface CreateUserDto {
  givenName: string,
  surName: string,
  email: string,
  role: Role,
  status: Status;
}
