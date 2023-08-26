import { Role } from "@modules/admin/modules/user/store/role";

export interface Action {
  name: string;
  description: string;
  icon: string;
  role?: Role;
  handler: ActionHandler;
}

export interface ActionHandler {
  onAction(action: Action): void;
}
