import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Tag } from '@gallery/store/tags/tag.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { TagState } from '@gallery/store/tags/tag.selectors';
import { Store } from '@ngrx/store';

export interface DialogData {
  tagCategories: string[];
}

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss']
})

export class EditTagsComponent implements OnInit {

  categoryCtrl: FormControl;
  tagsCtrl: FormControl;
  filteredItems: Observable<any[]>;
  items: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditTagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<TagState>,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.items = this.data.tagCategories;
    this.categoryCtrl = new FormControl(null, Validators.required);
    this.tagsCtrl = new FormControl(null, Validators.required);
    this.filteredItems = this.categoryCtrl.valueChanges
      .pipe(
        startWith(''),
        tap(item => console.log('item', item)),
        map(item => item ? this.filter(item) : this.items.slice())
      );
    this.filteredItems.subscribe(filtered => {
      console.log('filteredItems', filtered);
    });
  }

  createTag(): Tag {
    const txt: string = this.tagsCtrl.value;
    const entries: string[] = txt.split(', ');
    const result: string[] = [];
    entries.every(entry => result.push(entry.trim()));
    return {
      tagName: this.categoryCtrl.value,
      entries: result
    };
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  addCategory(): void {
    const value = this.categoryCtrl.value;
    if (!this.items.some(entry => entry === value)) {
      this.items.push(value);
      this.categoryCtrl.setValue(value);
    }
  }

  save(): void {
    if (this.categoryCtrl.valid && this.tagsCtrl.valid) {
      this.dialogRef.close(this.createTag());
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
