import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface FinderDialogData {
  userIdentities: UserIdentity[];
}

@Component({
    selector: 'app-finder-dialog',
    templateUrl: './finder-dialog.component.html',
    styleUrls: ['./finder-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatButtonModule]
})
export class FinderDialogComponent {

  selected: UserIdentity;
  userIdentities: UserIdentity[];

  constructor(public dialogRef: MatDialogRef<FinderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FinderDialogData) {
    this.userIdentities = data.userIdentities
  }

  sendFindOptions(): void {
    const id = this.selected ? this.selected.id : undefined;
    this.dialogRef.close(id);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
