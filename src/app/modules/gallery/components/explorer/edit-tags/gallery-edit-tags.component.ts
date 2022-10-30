import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag, TagCategory } from '@gallery/store/tags/tag.model';
import { MatDialogRef } from '@angular/material/dialog';
import { arrayUtil } from '@app/common/util/array-utils';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { DeleteCategory, UpdateCategory } from "@gallery/store/tags/tag.action";
import { Changes } from "@gallery/components/explorer/edit-tags/edit-tag-detail/gallery-edit-tag-detail.component";

@Component({
  selector: 'app-gallery-edit-tags',
  templateUrl: './gallery-edit-tags.component.html',
  styleUrls: ['./gallery-edit-tags.component.scss']
})
export class GalleryEditTagsComponent implements OnInit {

  // no "find in files" ?!?
  // @ViewChild(GalleryEditTagDetailComponent)
  // editDetailComponent!: GalleryEditTagDetailComponent;
  //
  // no "find in files" ?!?
  // @ViewChild(MatSelectionList)
  // selectionList!: MatSelectionList;

  @Select(TagState.getTagCategories)
  categories$: Observable<TagCategory[]>;
  categories: TagCategory[] = [];
  copies: TagCategory[] = [];
  currentCategory: TagCategory;
  currentIndex = 0;
  hasChanges = false;


  constructor(private store: Store,
              public dialogRef: MatDialogRef<GalleryEditTagsComponent>) {
  }

  ngOnInit(): void {
    this.categories$.subscribe(res => {
      this.categories = res;
      this.copies = JSON.parse(JSON.stringify(res)) as TagCategory[];
      this.hasChanges = false;
      this.computeCurrentCategory();
    });
  }

  computeCurrentCategory(): void {
    if (!this.currentCategory) {
      this.currentCategory = this.copies[0];
    } else {
      const index: number = this.copies.findIndex((x) => x.id === this.currentCategory.id);
      if (index === -1) {
        const max: number = Math.max(this.currentIndex - 1, 0);
        this.currentCategory = this.copies[max];
      }
    }
  }

  onSelectCategory(tag: TagCategory): void {
    this.currentIndex = this.copies.findIndex((x) => x.id === tag.id);
    this.currentCategory = this.copies[this.currentIndex];
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.updateStore();
  }

  save(): void {
    this.updateStore();
    this.dialogRef.close();
  }

  tagsAreIdentical(): boolean {
    for (let i = 0; i < this.copies.length; i++) {
      if (!arrayUtil.sameElements(this.categories[i].tags, this.copies[i].tags)) {
        return false;
      }
    }
    return true;
  }

  onEntriesChanged($event: Changes): void {
    console.log('GalleryEditTagsComponent onEntriesChanged: ', $event)
    // this.hasChanges = !this.tagsAreIdentical();
    this.hasChanges = !!$event
  }

  onDeleteCategory($event: TagCategory): void {
    this.store.dispatch(new DeleteCategory($event.id!));
  }

  onNewTag(): void {
    this.currentCategory = {
      tags: [],
      name: '',
      priority: 20
    }
    console.log('new');
  }

  private updateStore(): void {
    if (this.hasChanges) {
      for (let i = 0; i < this.copies.length; i++) {
        if (!arrayUtil.sameElements(this.categories[i].tags, this.copies[i].tags)) {
          // todo use "updateTags" (many) !!!
          console.log('GalleryEditTagsComponent updateStore: ',)
          this.store.dispatch(new UpdateCategory(this.copies[i]));
        }
      }
      this.hasChanges = false;
    }
  }

}
