import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagCategory } from '@gallery/store/tags/tag.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import * as tagActions from "@gallery/store/tags/tag.action";
import { TagChanges } from "@gallery/components/explorer/edit-tags/edit-tag-detail/gallery-edit-tag-detail.component";

interface Changes {
  category: TagCategory;
  tagChanges: TagChanges | null;
  action: CrudAction;
}

// TODO move to 'common'. will use
export enum CrudAction {
  create,
  update,
  remove,
  none
}

@Component({
  selector: 'app-gallery-edit-tags',
  templateUrl: './gallery-edit-tags.component.html',
  styleUrls: ['./gallery-edit-tags.component.scss']
})
export class GalleryEditTagsComponent implements OnInit {

  @Select(TagState.getTagCategories)
  categories$: Observable<TagCategory[]>;
  categories: TagCategory[] = [];
  currentCategory: TagCategory;
  hasChanges: boolean;
  changes: Changes[];
  dirtyState = false;

  constructor(private store: Store,
              public dialogRef: MatDialogRef<GalleryEditTagsComponent>) {
  }

  ngOnInit(): void {
    this.categories$.subscribe(res => {
      this.categories = res;
      this.currentCategory = this.categories[0];
      this.changes = [];
      for (const category of this.categories) {
        this.changes.push({category: category, tagChanges: null, action: CrudAction.none});
      }
    });
  }

  onSelectCategory(tag: TagCategory): void {
    this.currentCategory = this.categories.find((x) => x.id === tag.id)!;
    this.dirtyState = false;
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    if (this.hasChanges) {
      this.updateStore();
    }
  }

  save(): void {
    this.apply();
    this.dialogRef.close();
  }

  onNewTag(): void {
    const newCategory: TagCategory = {
      tags: [],
      name: '',
      priority: 20
    }
    this.currentCategory = newCategory;
    this.changes.push({category: newCategory, tagChanges: null, action: CrudAction.create})
    // this.dirtyState = true;
  }

  onEntriesChanged($event: TagChanges | null): void {
    this.hasChanges = !!$event;
    const element = this.changes.find(change => change.category === this.currentCategory)!;
    if (element.action === CrudAction.none) {
      element.action = CrudAction.update;
    }
    element.tagChanges = $event;
  }

  onDeleteCategory($event: TagCategory): void {
    this.store.dispatch(new tagActions.DeleteCategory($event.id!));
  }

  private updateStore(): void {
    for (const change of this.changes) {
      switch (change.action) {
        case CrudAction.create:
          this.createCategory(change);
          break;
        case CrudAction.update:
          this.updateCategory(change);
          break;
        case CrudAction.remove:
          this.deleteCategory(change);
          break;
      }
    }
    this.hasChanges = false;
  }

  private createCategory(changes: Changes): void {
    this.store.dispatch(new tagActions.AddCategory({
      name: changes.tagChanges!.name,
      priority: 20,
      tagNames: changes.tagChanges?.addedTagNames
    }));
  }

  private updateCategory(changes: Changes): void {
    const idsOfDeletedTags = this.findIdsOfDeletedTags(changes);
    this.store.dispatch(new tagActions.UpdateCategory({
      id: changes.category.id!,
      name: changes.category.name,
      // priority: 20,
      addedNames: changes.tagChanges?.addedTagNames,
      removedTagIds: idsOfDeletedTags
    }));
  }

  private deleteCategory(changes: Changes): void {
    this.store.dispatch(new tagActions.DeleteCategory(changes.category.id!));
  }

  private findIdsOfDeletedTags(changes: Changes): string[] {
    const result: string[] = [];
    const tagNames = changes.tagChanges?.removedTagNames;
    if (tagNames) {
      const tags = changes.category.tags;
      for (const name of tagNames) {
        result.push(tags.find(tag => tag.name === name)!.id);
      }
    }
    return result;
  }

}
