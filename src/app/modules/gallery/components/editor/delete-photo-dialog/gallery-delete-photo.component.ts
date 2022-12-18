import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeletePhotoDialogData } from "@gallery/components/editor/gallery-editor.component";

@Component({
  selector: 'app-gallery-delete-photo',
  templateUrl: './gallery-delete-photo.component.html',
  styleUrls: ['./gallery-delete-photo.component.scss']
})
export class GalleryDeletePhotoComponent {

  constructor(public dialogRef: MatDialogRef<GalleryDeletePhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeletePhotoDialogData) { }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
