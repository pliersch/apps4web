import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { AddTagGroup } from "@gallery/store/tags/tag.action";
import { CreteTagGroupDto } from "@gallery/store/tags/tag.model";

@Component({
  selector: 'app-new-tag-group',
  templateUrl: './gallery-new-tag-group.component.html',
  styleUrls: ['./gallery-new-tag-group.component.scss']
})
export class GalleryNewTagGroupComponent {

  form = this.fb.group({
    group: [null, Validators.required],
    tags: [null, Validators.required],
    priority: [{
      value: 1,
      disabled: false,
    }, Validators.required],
  });
  isValid = false;

  constructor(private fb: UntypedFormBuilder,
              private store: Store,
              public dialogRef: MatDialogRef<GalleryNewTagGroupComponent>) { }

  onSave(): void {
    const name: string = this.form.get('group')!.value;
    const tags: string = this.form.get('tags')!.value;
    const entries: string[] = tags.split(',');
    const priority: number = this.form.get('priority')!.value;
    entries.forEach(entry => entry.trim());
    const dto: CreteTagGroupDto = {
      name: name,
      tagNames: entries,
      priority: priority
    }
    this.store.dispatch(new AddTagGroup(dto));
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  detectChanges(): void {
    const group: string = this.form.get('group')!.value;
    if (!(group && group.length > 2)) {
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
