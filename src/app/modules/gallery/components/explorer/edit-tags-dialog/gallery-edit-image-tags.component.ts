import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tag, TagGroup } from "@gallery/store/tags/tag.model";

export interface EditPhotoPropertiesDialogData {
  tags: Tag[];
  availableTags: TagGroup[];
}

export interface EditPhotoPropertiesDialogResult {
  addedTags: Tag[];
  removedTags: Tag[];
  private: boolean;
}

interface Changes {
  addedTags: Tag[];
  removedTags: Tag[];
}

interface CheckList {
  items: CheckListItem[];
  title: string
}

interface CheckListItem {
  tag: Tag;
  checked: boolean;
  index: number;
  indeterminate: boolean;
}

@Component({
  selector: 'app-gallery-edit-image-tags',
  templateUrl: './gallery-edit-image-tags.component.html',
  styleUrls: ['./gallery-edit-image-tags.component.scss']
})

export class GalleryEditImageTagsComponent {

  tagGroups: TagGroup[];
  originalTags: Tag[];
  checkLists: CheckList[] = []
  changed = false;
  private: boolean;
  indeterminatePrivate = true;

  constructor(public dialogRef: MatDialogRef<GalleryEditImageTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditPhotoPropertiesDialogData) {
    this.tagGroups = this.data.availableTags;
    this.originalTags = this.data.tags;
    let count = 0;
    let currentCheckList: CheckList;
    for (const tagGroup of this.tagGroups) {
      currentCheckList = {title: tagGroup.name, items: []};
      this.checkLists.push(currentCheckList);
      for (const tag of tagGroup.tags) {
        currentCheckList.items.push({
          tag: tag,
          index: count++,
          indeterminate: !!this.originalTags.find(tag2 => tag.name === tag2.name),
          checked: false
        })
      }
    }
  }

  onSave(): void {
    const changes = this.findChangedTags();
    const result: EditPhotoPropertiesDialogResult = {
      addedTags: changes.addedTags,
      removedTags: changes.removedTags,
      private: this.private
    }
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSelectionChange(item: CheckListItem): void {
    if (item.indeterminate) {
      item.indeterminate = false;
    }
    const changes = this.findChangedTags();
    this.changed = changes.addedTags.length > 0 || changes.removedTags.length > 0;
    // check
    this.onAccessChange();
  }

  onAccessChange(): void {
    if (!this.indeterminatePrivate) {
      this.changed = true;
    }
  }

  private findChangedTags(): Changes {
    const changes: Changes = {
      addedTags: [],
      removedTags: []
    };
    for (const checkList of this.checkLists) {
      for (const item of checkList.items) {
        const tag = this.originalTags.find(tag => tag.name === item.tag.name);
        if (tag && item.checked) {
          changes.addedTags.push(item.tag)
        }
        if (tag && !item.checked && !item.indeterminate) {
          changes.removedTags.push(item.tag)
        }
        if (!tag && item.checked) {
          changes.addedTags.push(item.tag)
        }
      }
    }
    return changes;
  }
}
