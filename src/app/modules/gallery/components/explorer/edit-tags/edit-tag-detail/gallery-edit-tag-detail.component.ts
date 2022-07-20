import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {Tag} from '@gallery/store/tags/tag.model';

@Component({
  selector: 'app-gallery-edit-tag-detail',
  templateUrl: './gallery-edit-tag-detail.component.html',
  styleUrls: ['./gallery-edit-tag-detail.component.scss']
})
export class GalleryEditTagDetailComponent implements OnChanges {

  @Input()
  tag: Tag;

  @Output()
  tagChangesEvent = new EventEmitter<never>();
  @Output()
  deleteEvent = new EventEmitter<Tag>();

  entries: string[];
  observable: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  ngOnChanges(/*changes: SimpleChanges*/): void {
    this.entries = this.tag.entries;
    this.observable = of(this.entries);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.entries.push(value.trim());
      this.emitStateChange();
    }
    if (input) {
      input.value = '';
    }
  }

  remove(entry: string): void {
    console.log('remove', entry);
    const index = this.entries.indexOf(entry);
    if (index >= 0) {
      this.entries.splice(index, 1);
      this.emitStateChange();
    }
  }

  emitStateChange(): void {
    this.tagChangesEvent.emit();
  }

  onClickDelete(tag: Tag): void {
    this.deleteEvent.emit(tag);
  }
}
