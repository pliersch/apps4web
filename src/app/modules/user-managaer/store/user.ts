import { Role } from "@modules/user-managaer/store/role";
import { Status } from "@modules/user-managaer/store/status";

export interface User {
  id: string,
  givenName: string,
  lastName: string,
  email: string,
  role: Role,
  photoUrl: string;
  status: Status;
  lastLogin: Date;
}
