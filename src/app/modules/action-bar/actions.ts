import { Role } from "@modules/admin/modules/user/store/role";

export interface Action {
  name: ActionTypes;
  description: string;
  icon: string;
  role?: Role;
  handler: ActionHandler;
}

export type ActionTypes = 'SelectAll' | 'DeselectAll' | 'ToggleSelection' | 'DeleteMany' |
  'ManageTags' | 'AddToDownload' | 'Download' | 'EditPhotos';

export interface ActionHandler {
  onAction(action: Action): void;
}
