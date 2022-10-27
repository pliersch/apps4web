import { Role } from "@modules/user-managaer/store/role";

export interface User {
  id: number,
  givenName: string,
  lastName: string,
  email: string,
  role: Role,
  photoUrl: string;
}
