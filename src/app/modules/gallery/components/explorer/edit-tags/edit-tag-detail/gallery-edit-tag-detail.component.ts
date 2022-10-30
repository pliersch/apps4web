import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { TagCategory } from '@gallery/store/tags/tag.model';

export interface Changes {
  name: string;
  addedTagNames: string[];
  removedTagNames: string[];
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

  tagNames: string[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();

  nameExists = false;

  changes: Changes = {
    name: '',
    addedTagNames: [],
    removedTagNames: []
  }

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.tagNames = [];
    for (const tag of this.category.tags) {
      this.tagNames.push(tag.name);
    }
  }

  onClickDeleteTag(category: TagCategory): void {
    this.deleteEvent.emit(category);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const name = event.value.trim();

    if ((name || '').trim()) {

      if (this.tagNames.find(tag => tag === name)) {
        this.nameExists = true;
      } else {
        this.changes.addedTagNames.push(name);
        this.tagNames.push(name)
        this.emitStateChange();
        if (input) {
          input.clear();
        }
      }
    }
  }

  remove(tagName: string): void {
    this.tagNames = this.tagNames.filter(item => item !== tagName)
    this.changes.removedTagNames.push(tagName);
    this.emitStateChange();
  }

  onEditTagName($event: string): void {
    for (const tagName of this.tagNames) {
      this.nameExists = $event === tagName;
    }
  }

  onChangeCategoryName($event: string): void {
    this.changes.name = this.category.name === $event ? '' : $event;
    this.emitStateChange();
  }

  emitStateChange(): void {
    this.compareAddedAndRemovedTags(this.changes);
    if (this.changes.name !== ''
      || this.changes.removedTagNames.length > 0
      || this.changes.addedTagNames.length > 0) {
      this.tagChangesEvent.emit(this.changes);
    } else {
      this.tagChangesEvent.emit(undefined);
    }
  }

  compareAddedAndRemovedTags(changes: Changes): void {
    const intersection = changes.addedTagNames.filter(x => changes.removedTagNames.includes(x));
    for (const tagName of intersection) {
      changes.addedTagNames = changes.addedTagNames.filter(item => item !== tagName)
      changes.removedTagNames = changes.removedTagNames.filter(item => item !== tagName)
    }
  }
}
