export interface Action {
  name: any;
  tooltip: string;
  icon: string;
  handler: ActionProvider;
}

export interface ActionProvider {
  onAction(action: Action): void;
}
