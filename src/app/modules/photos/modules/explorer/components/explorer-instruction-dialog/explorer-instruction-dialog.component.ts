import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-instruction-dialog',
  templateUrl: './explorer-instruction-dialog.component.html',
  styleUrls: ['./explorer-instruction-dialog.component.scss']
})
export class ExplorerInstructionDialogComponent {

  constructor(public dialogRef: MatDialogRef<ExplorerInstructionDialogComponent>) { }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
