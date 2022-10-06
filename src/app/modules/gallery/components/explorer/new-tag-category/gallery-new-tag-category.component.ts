import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { AddTag } from "@gallery/store/tags/tag.action";
import { Tag } from "@gallery/store/tags/tag.model";

@Component({
  selector: 'app-new-tag-category',
  templateUrl: './gallery-new-tag-category.component.html',
  styleUrls: ['./gallery-new-tag-category.component.scss']
})
export class GalleryNewTagCategoryComponent {

  form = this.fb.group({
    category: [null, Validators.required],
    tags: [null, Validators.required],
    priority: [{
      value: 1,
      disabled: false,
    }, Validators.required],
  });
  isValid = false;

  constructor(private fb: UntypedFormBuilder,
              private store: Store,
              public dialogRef: MatDialogRef<GalleryNewTagCategoryComponent>) { }

  onSave(): void {
    const category: string = this.form.get('category')!.value;
    const tags: string = this.form.get('tags')!.value;
    const entries: string[] = tags.split(',');
    const priority: number = this.form.get('priority')!.value;
    const result: string[] = [];
    entries.forEach(entry => {
      result.push(entry.trim());
    });
    const tag: Tag = {
      tagName: category,
      entries: result,
      priority: priority
    }
    this.store.dispatch(new AddTag(tag));
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  detectChanges(): void {
    const category: string = this.form.get('category')!.value;
    if (!(category && category.length > 2)) {
      this.isValid = false;
      return;
    }
    const tags: string = this.form.get('tags')!.value;
    if (!(tags && tags.length > 2)) {
      this.isValid = false;
      return;
    }
    this.isValid = true;
  }
}
