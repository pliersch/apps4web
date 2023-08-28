import { User } from "@account/store/user.model";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

export interface DeleteUserDialogData {
  user: User;
}

@Component({
    selector: 'app-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrls: ['./delete-user-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class DeleteUserDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData) { }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
