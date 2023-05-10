export class SetCheckedInstruction {
  static readonly type = '[App] Set Checked Instruction';

  constructor(public readonly pageName: string) { }
}

