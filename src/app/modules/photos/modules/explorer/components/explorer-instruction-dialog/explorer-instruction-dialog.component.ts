import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-instruction-dialog',
    templateUrl: './explorer-instruction-dialog.component.html',
    styleUrls: ['./explorer-instruction-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
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
