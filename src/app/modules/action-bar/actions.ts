export interface Action {
  name: any;
  description: string;
  icon: string;
  handler: ActionProvider;
}

export interface ActionProvider {
  onAction(action: Action): void;
}
