export class ToggleAction {

  static readonly type = '[Theme] Toggle';

  constructor(public payload: { theme: string }) {
  }
}
