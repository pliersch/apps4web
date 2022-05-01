import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {DialogData} from "@gallery/components/gallery-explorer/gallery-explorer.component";

@Component({
  selector: 'app-gallery-edit-image-tags',
  templateUrl: './gallery-edit-image-tags.component.html',
  styleUrls: ['./gallery-edit-image-tags.component.scss']
})

export class GalleryEditImageTagsComponent implements OnInit {

  observable: Observable<string[]>;
  existingTags: string[] = [];
  addedTags: string[] = [];
  removedTags: string[] = [];
  tagCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<GalleryEditImageTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }


  ngOnInit(): void {
    this.existingTags = this.data.tags;
    this.observable = of(this.existingTags);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (!this.existingTags.includes(value)) {
        this.existingTags.push(value);
        this.addedTags.push(value);
        event.chipInput!.clear();
      }
    }
  }

  remove(tag: string): void {
    console.log('GalleryEditImageTagsComponent remove: ',)
    this.existingTags = this.existingTags.filter(item => item !== tag)
    // const index = this.existingTags.indexOf(tag);
    // if (index >= 0) {
    //   this.entries.splice(index, 1);
    //   this.emitStateChange();
    // }
    console.log(this.existingTags)
  }

  onSave(): void {
    this.dialogRef.close(this.addedTags);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  detectChanges(): void {
    // const category: string = this.form.get('category')!.value;
    // if (!(category && category.length > 2)) {
    //   this.isValid = false;
    //   return;
    // }
    // const tags: string = this.form.get('tags')!.value;
    // if (!(tags && tags.length > 2)) {
    //   this.isValid = false;
    //   return;
    // }
    // this.isValid = true;
  }


}
