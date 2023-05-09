import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeletePhotoDialogData } from "@modules/photos/modules/explorer/pages/editor/photos-editor.component";

@Component({
  selector: 'app-photos-delete-photo',
  templateUrl: './photos-delete-photo.component.html',
  styleUrls: ['./photos-delete-photo.component.scss']
})
export class PhotosDeletePhotoComponent {

  constructor(public dialogRef: MatDialogRef<PhotosDeletePhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeletePhotoDialogData) { }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
