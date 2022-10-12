import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeletePhotoDialogData, EditTagsDialogData } from "@gallery/components/explorer/gallery-explorer.component";

@Component({
  selector: 'app-gallery-delete-photo',
  templateUrl: './gallery-delete-photo.component.html',
  styleUrls: ['./gallery-delete-photo.component.scss']
})
export class GalleryDeletePhotoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GalleryDeletePhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeletePhotoDialogData) { }

  ngOnInit(): void {
    console.log('GalleryDeletePhotoComponent ngOnInit: ', this.data.photo)
  }

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
