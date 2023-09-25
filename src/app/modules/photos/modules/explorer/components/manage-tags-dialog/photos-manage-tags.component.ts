import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatListRemovePaddingDirective } from '@app/common/directives/mat-list-remove-padding.directive';
import { TagChanges } from "@modules/photos/modules/explorer";
import * as tagActions from "@modules/photos/store/tags/tag.action";
import { TagGroup } from '@modules/photos/store/tags/tag.model';
import { TagState } from "@modules/photos/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable, Subscription } from 'rxjs';
import { PhotosManageTagDetailComponent } from './manage-tag-detail/photos-manage-tag-detail.component';

interface Changes {
  tagGroup: TagGroup;
  tagChanges: TagChanges | null;
  action: CrudAction;
}

// TODO move to 'common'. but what about none?
export enum CrudAction {
  create,
  update,
  remove,
  none
}

@Component({
  selector: 'app-photos-edit-tags',
  templateUrl: './photos-manage-tags.component.html',
  styleUrls: ['./photos-manage-tags.component.scss'],
  standalone: true,
  imports: [MatDialogModule, NgScrollbar, MatListModule, MatListRemovePaddingDirective, NgFor, MatButtonModule, PhotosManageTagDetailComponent, AsyncPipe]
})
export class PhotosManageTagsComponent implements OnInit, OnDestroy {

  @Select(TagState.getTagGroups)
  tagGroups$: Observable<TagGroup[]>;
  tagGroups: TagGroup[] = [];
  currentGroup: TagGroup;
  hasChanges: boolean;
  isCreatingGroup = false;
  private changes: Changes[];
  private subscription: Subscription;

  constructor(private store: Store,
              public dialogRef: MatDialogRef<PhotosManageTagsComponent>) {
  }

  ngOnInit(): void {
    this.subscription = this.tagGroups$.subscribe(res => {
      this.tagGroups = res;
      this.currentGroup = this.tagGroups[0];
      this.changes = [];
      for (const tagGroup of this.tagGroups) {
        this.changes.push({tagGroup: tagGroup, tagChanges: null, action: CrudAction.none});
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectTagGroups(tag: TagGroup): void {
    this.currentGroup = this.tagGroups.find((x) => x.id === tag.id)!;
    if (this.isCreatingGroup) {
      this.isCreatingGroup = false;
      this.deleteInvalidCreatedGroup();
    }
  }

  onClickClose(): void {
    this.dialogRef.close();
  }

  onClickApply(): void {
    if (this.hasChanges) {
      this.updateStore();
    }
  }

  onClickSave(): void {
    this.onClickApply();
    this.dialogRef.close();
  }

  onClickCreateGroup(): void {
    const newGroup: TagGroup = {
      tags: [],
      name: '',
      priority: 20
    }
    this.currentGroup = newGroup;
    this.changes.push({tagGroup: newGroup, tagChanges: null, action: CrudAction.create})
    this.isCreatingGroup = true;
  }

  deleteInvalidCreatedGroup(): void {
    const lastChange = this.changes[this.changes.length - 1];
    if (lastChange.tagGroup.name == '') {
      this.changes.pop()
    }
  }

  handleEntriesChanged($event: TagChanges | null): void {
    this.hasChanges = !!$event;
    const element = this.changes.find(change => change.tagGroup === this.currentGroup)!;
    if (element.action === CrudAction.none) {
      element.action = CrudAction.update;
    }
    element.tagChanges = $event;
  }

  handleDeleteGroup($event: TagGroup): void {
    this.store.dispatch(new tagActions.DeleteTagGroup($event.id!));
  }

  private updateStore(): void {
    for (const change of this.changes) {
      switch (change.action) {
        case CrudAction.create:
          this.createGroup(change);
          break;
        case CrudAction.update:
          this.updateGroup(change);
          break;
        case CrudAction.remove:
          this.deleteGroup(change);
          break;
      }
    }
    this.hasChanges = false;
  }

  private createGroup(changes: Changes): void {
    this.store.dispatch(new tagActions.AddTagGroup({
      name: changes.tagChanges!.name,
      priority: 20,
      tagNames: changes.tagChanges?.addedTagNames
    }));
    this.isCreatingGroup = false;
  }

  private updateGroup(changes: Changes): void {
    const idsOfDeletedTags = this.findIdsOfDeletedTags(changes);
    this.store.dispatch(new tagActions.UpdateTagGroup({
      id: changes.tagGroup.id!,
      name: changes.tagGroup.name,
      // priority: 20,
      addedNames: changes.tagChanges?.addedTagNames,
      removedTagIds: idsOfDeletedTags
    }));
  }

  private deleteGroup(changes: Changes): void {
    this.store.dispatch(new tagActions.DeleteTagGroup(changes.tagGroup.id!));
  }

  private findIdsOfDeletedTags(changes: Changes): string[] {
    const result: string[] = [];
    const tagNames = changes.tagChanges?.removedTagNames;
    if (tagNames) {
      const tags = changes.tagGroup.tags;
      for (const name of tagNames) {
        result.push(tags.find(tag => tag.name === name)!.id);
      }
    }
    return result;
  }

}
