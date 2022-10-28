import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { Tag, TagCategory } from '@gallery/store/tags/tag.model';

@Component({
  selector: 'app-gallery-edit-tag-detail',
  templateUrl: './gallery-edit-tag-detail.component.html',
  styleUrls: ['./gallery-edit-tag-detail.component.scss']
})
export class GalleryEditTagDetailComponent implements OnChanges {

  @Input()
  tag: TagCategory;

  @Output()
  tagChangesEvent = new EventEmitter<never>();
  @Output()
  deleteEvent = new EventEmitter<TagCategory>();

  entries: Tag[];
  observable: Observable<Tag[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.entries = this.tag.entries;
    this.observable = of(this.entries);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const value = event.value;
    if ((value || '').trim()) {
      this.entries.push({name: value.trim()});
      this.emitStateChange();
    }
    if (input) {
      input.clear();
    }
  }

  remove(entry: Tag): void {
    const index = this.entries.indexOf(entry);
    if (index >= 0) {
      this.entries.splice(index, 1);
      this.emitStateChange();
    }
  }

  emitStateChange(): void {
    this.tagChangesEvent.emit();
  }

  onClickDelete(tag: TagCategory): void {
    this.deleteEvent.emit(tag);
  }
}
