import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-editor-instruction-dialog',
    templateUrl: './editor-instruction-dialog.component.html',
    styleUrls: ['./editor-instruction-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
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
