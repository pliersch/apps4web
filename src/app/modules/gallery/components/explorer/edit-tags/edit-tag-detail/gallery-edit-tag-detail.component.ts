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
  category: TagCategory;

  @Output()
  tagChangesEvent = new EventEmitter<never>();
  @Output()
  deleteEvent = new EventEmitter<TagCategory>();

  tags: Tag[];
  observable: Observable<Tag[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.tags = this.category?.tags;
    this.observable = of(this.tags);
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
      this.emitStateChange();
    }
    if (input) {
      input.clear();
    }
  }

  remove(entry: Tag): void {
    const index = this.tags.indexOf(entry);
    if (index >= 0) {
      this.tags.splice(index, 1);
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
