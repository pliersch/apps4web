import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-editor-instruction-dialog',
  templateUrl: './editor-instruction-dialog.component.html',
  styleUrls: ['./editor-instruction-dialog.component.scss']
})
export class EditorInstructionDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditorInstructionDialogComponent>) { }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}