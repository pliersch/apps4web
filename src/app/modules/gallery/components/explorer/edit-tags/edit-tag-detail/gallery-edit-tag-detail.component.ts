import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { Tag, TagCategory } from '@gallery/store/tags/tag.model';

export interface Changes {
  name: string;
  addedTags: Tag[];
  removedTags: Tag[];
}

@Component({
  selector: 'app-gallery-edit-tag-detail',
  templateUrl: './gallery-edit-tag-detail.component.html',
  styleUrls: ['./gallery-edit-tag-detail.component.scss']
})
export class GalleryEditTagDetailComponent implements OnChanges {

  @Input()
  category: TagCategory;
  copy: TagCategory

  @Output()
  tagChangesEvent = new EventEmitter<Changes>();
  @Output()
  deleteEvent = new EventEmitter<TagCategory>();

  tags$: Observable<Tag[]>;
  tags: Tag[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();

  changes: Changes = {
    name: '',
    addedTags: [],
    removedTags: []
  }

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.copy = JSON.parse(JSON.stringify(this.category)) as TagCategory
    console.log('GalleryEditTagDetailComponent ngOnChanges: ', this.copy)
    this.tags = this.category.tags || [];
    this.tags$ = of(this.tags);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const value = event.value;
    if ((value || '').trim()) {
      this.changes.addedTags.push({name: value.trim()});
      this.emitStateChange();
    }
    if (input) {
      input.clear();
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

  emitStateChange(): void {
    if (this.changes.name !== ''
      || this.changes.removedTags.length > 0
      || this.changes.addedTags.length > 0) {
      this.tagChangesEvent.emit(this.changes);
    } else {
      this.tagChangesEvent.emit(undefined);
    }
  }

  onClickDelete(category: TagCategory): void {
    this.deleteEvent.emit(category);
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
}
