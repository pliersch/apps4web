import { COMMA, ENTER } from '@angular/cdk/keycodes'; // FIXME obsolete, use KeyboardEvent.code
import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { intersect } from "@app/common/util/array-utils";
import { TagGroup } from '@gallery/store/tags/tag.model';

export interface TagChanges {
  name: string;
  addedTagNames: string[];
  removedTagNames: string[];
}

@Component({
  selector: 'app-gallery-manage-tag-detail',
  templateUrl: './gallery-manage-tag-detail.component.html',
  styleUrls: ['./gallery-manage-tag-detail.component.scss']
})
export class GalleryManageTagDetailComponent implements OnChanges {

  @Input()
  tagGroup: TagGroup;

  @Output()
  tagChangesEvent = new EventEmitter<TagChanges | null>();
  @Output()
  deleteGroupEvent = new EventEmitter<TagGroup>();

  tagNames: string[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();
  nameExists = false;
  changes: TagChanges;


  constructor(private renderer: Renderer2) {
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.tagGroup.currentValue.name === '') {
      this.renderer.selectRootElement('input').focus()
    }
    this.changes = {
      name: '',
      addedTagNames: [],
      removedTagNames: []
    }
    this.tagNames = [];
    for (const tag of this.tagGroup.tags) {
      this.tagNames.push(tag.name);
    }
  }

  onClickDeleteTagGroup(group: TagGroup): void {
    this.deleteGroupEvent.emit(group);
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

  onChangeGroupName($event: string): void {
    this.changes.name = this.tagGroup.name === $event ? '' : $event;
    this.emitStateChange();
  }

  emitStateChange(): void {
    this.cleanUpAddedAndRemovedTags(this.changes);
    if (this.changes.name !== ''
      || this.changes.removedTagNames.length > 0
      || this.changes.addedTagNames.length > 0) {
      this.tagChangesEvent.emit(this.changes);
    } else {
      this.tagChangesEvent.emit(null);
    }
  }

  cleanUpAddedAndRemovedTags(changes: TagChanges): void {
    const intersection = intersect(changes.addedTagNames, changes.removedTagNames);
    for (const tagName of intersection) {
      changes.addedTagNames = changes.addedTagNames.filter(item => item !== tagName)
      changes.removedTagNames = changes.removedTagNames.filter(item => item !== tagName)
    }
  }
}
