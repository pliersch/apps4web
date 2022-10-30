import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, UntypedFormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag, TagCategory } from '@gallery/store/tags/tag.model';
import { ErrorStateMatcher } from "@angular/material/core";

export interface Changes {
  name: string;
  addedTags: Tag[];
  removedTags: Tag[];
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    console.log('MyErrorStateMatcher isErrorState: ', control?.value)
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-gallery-edit-tag-detail',
  templateUrl: './gallery-edit-tag-detail.component.html',
  styleUrls: ['./gallery-edit-tag-detail.component.scss']
})
export class GalleryEditTagDetailComponent implements OnChanges {

  @Input()
  category: TagCategory;

  @Output()
  tagChangesEvent = new EventEmitter<Changes>();
  @Output()
  deleteEvent = new EventEmitter<TagCategory>();

  tagCtrl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  tags: Tag[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // tagCtrl = new UntypedFormControl();

  nameExists = false;

  changes: Changes = {
    name: '',
    addedTags: [],
    removedTags: []
  }

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.tags = this.category.tags || [];
  }

  onClickDeleteTag(category: TagCategory): void {
    this.deleteEvent.emit(category);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const name = event.value.trim();

    if ((name || '').trim()) {

      if (this.category.tags.find(tag => tag.name === name)) {
        this.nameExists = true;
      } else {
        const tag: Tag = {name: name}
        this.changes.addedTags.push(tag);
        this.tags.push(tag)
        this.emitStateChange();
        if (input) {
          input.clear();
        }
      }
    }
  }

  remove(entry: Tag): void {
    const index = this.tags.indexOf(entry);
    if (index >= 0) {
      // this.changes.removedTags.splice(index, 1);
      this.changes.removedTags.push(entry);
      this.emitStateChange();
    }
  }

  onChangeName($event: string): void {
    if (this.category.name != $event) {
      this.changes.name = $event;
    } else {
      this.changes.name = '';
    }
    this.emitStateChange();
    console.log('GalleryEditTagDetailComponent onChangeName: ', this.changes.name)
  }

  emitStateChange(): void {
    if (this.changes.name !== ''
      || this.changes.removedTags.length > 0
      || this.changes.addedTags.length > 0) {
      this.tagChangesEvent.emit(this.changes);
    } else {
      this.tagChangesEvent.emit(undefined);
    }
  }
}
