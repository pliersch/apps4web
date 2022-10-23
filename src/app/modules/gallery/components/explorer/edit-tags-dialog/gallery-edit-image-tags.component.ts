import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { UntypedFormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { EditTagsDialogData } from "@gallery/components/editor/gallery-editor.component";

@Component({
  selector: 'app-gallery-edit-image-tags',
  templateUrl: './gallery-edit-image-tags.component.html',
  styleUrls: ['./gallery-edit-image-tags.component.scss']
})

export class GalleryEditImageTagsComponent implements OnInit {

  observable: Observable<string[]>;
  addedTags: string[] = [];
  removedTags: string[] = [];
  tagCtrl = new UntypedFormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  changed = false;

  constructor(public dialogRef: MatDialogRef<GalleryEditImageTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditTagsDialogData) { }

  ngOnInit(): void {
    this.observable = of(this.data.tags);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (!this.data.tags.includes(value)) {
        this.data.tags.push(value); // todo these 2 lines looks weird
        this.addedTags.push(value); // hmm?
        event.chipInput!.clear();
        this.changed = true;
      }
    }
  }

  remove(tag: string): void {
    const index = this.data.tags.indexOf(tag);
    if (index >= 0) {
      this.data.tags.splice(index, 1);
      this.removedTags.push(tag);
      this.changed = true;
    }
  }

  onSave(): void {
    this.dialogRef.close({addedTags: this.addedTags, removedTags: this.removedTags});
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
