import {Role} from "@modules//account/models/role";

export class Account {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  jwtToken?: string;
  isDeleting: boolean;
}
