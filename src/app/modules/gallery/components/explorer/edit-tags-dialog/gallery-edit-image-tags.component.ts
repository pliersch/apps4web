import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { EditTagsDialogData } from "@gallery/components/editor/gallery-editor.component";
import { Tag } from "@gallery/store/tags/tag.model";
import { FormControl, ValidationErrors, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-gallery-edit-image-tags',
  templateUrl: './gallery-edit-image-tags.component.html',
  styleUrls: ['./gallery-edit-image-tags.component.scss']
})

export class GalleryEditImageTagsComponent implements OnInit {
  @ViewChild('tagInput')
  tagInput: ElementRef<HTMLInputElement>;
  tags: Tag[];
  availableTags: Tag[];
  addedTags: string[] = [];
  removedTags: Tag[] = [];
  tagCtrl = new FormControl<string | Tag>('', [Validators.required, this.requireMatch.bind(this)]);
  filteredTags$: Observable<Tag[]>;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  changed = false;

  constructor(public dialogRef: MatDialogRef<GalleryEditImageTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditTagsDialogData) { }

  ngOnInit(): void {
    this.tags = this.data.tags;
    this.availableTags = this.data.availableTags;
    this.filteredTags$ = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        // console.log('GalleryEditImageTagsComponent : ', name)
        return name ? this.filter(name as string) : this.availableTags.slice();
      })
    );
  }

  add(event: MatChipInputEvent): void {
    const newName = (event.value || '').trim();
    if (newName) {
      if (!this.data.tags.find(x => x.name === newName)) {
        this.data.tags.push({id: '0', name: newName, tagGroupId: '0'});
        this.addedTags.push(newName);
        event.chipInput!.clear();
        this.changed = true;
      }
    }
  }

  remove(tag: Tag): void {
    const index = this.data.tags.indexOf(tag);
    if (index >= 0) {
      this.data.tags.splice(index, 1);
      this.removedTags.push(tag);
      this.changed = true;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.tags.push(event.option.viewValue);
    this.tags.push({id: '0', name: event.option.viewValue, tagGroupId: '0'});
    this.addedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  onSave(): void {
    this.dialogRef.close({addedTags: this.addedTags, removedTags: this.removedTags});
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    console.log('GalleryEditImageTagsComponent requireMatch: ', selection)
    if (this.tags?.indexOf(selection) < 0) {
      console.log('GalleryEditImageTagsComponent requireMatch: true',)
      return {requireMatch: true};
    }
    console.log('GalleryEditImageTagsComponent requireMatch: false',)
    return null;
  }

  private filter(tagName: string): Tag[] {
    const filterValue = tagName.toLowerCase();
    return this.availableTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }


}
