import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@gallery/store/tags/tag.model';
import { MatDialogRef } from '@angular/material/dialog';
import {
  GalleryEditTagDetailComponent
} from '@gallery/components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-detail/gallery-edit-tag-detail.component';
import { MatSelectionList } from '@angular/material/list';
import { arrayUtil } from '@app/util/array-utils';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { DeleteTag, UpdateTag } from "@gallery/store/tags/tag.action";

@Component({
  selector: 'app-gallery-edit-tags',
  templateUrl: './gallery-edit-tags.component.html',
  styleUrls: ['./gallery-edit-tags.component.scss']
})
export class GalleryEditTagsComponent implements OnInit {

  // TODO no "find in files" ?!?
  @ViewChild(GalleryEditTagDetailComponent)
  editDetailComponent!: GalleryEditTagDetailComponent;

  // TODO no "find in files" ?!?
  @ViewChild(MatSelectionList)
  selectionList!: MatSelectionList;

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;
  tags: Tag[] = [];
  copies: Tag[] = [];
  currentTag: Tag;
  currentIndex = 0;
  hasChanges: boolean = false;

  constructor(private store: Store,
              public dialogRef: MatDialogRef<GalleryEditTagsComponent>) {
  }

  ngOnInit(): void {
    this.tags$.subscribe(tagArray => {
      this.tags = tagArray;
      this.copies = JSON.parse(JSON.stringify(tagArray)) as Tag[];
      this.hasChanges = false;
      this.computeCurrentTag();
    });
  }

  computeCurrentTag(): void {
    if (!this.currentTag) {
      this.currentTag = this.copies[0];
    } else {
      // @ts-ignore TODO warum eigentlich? es wird doch geprüft!?!
      const index: number = this.copies.findIndex((x) => x.id === this.currentTag.id);
      if (index === -1) {
        const max: number = Math.max(this.currentIndex - 1, 0);
        this.currentTag = this.copies[max];
      }
    }
  }

  onSelectCategory(tag: Tag): void {
    this.currentIndex = this.copies.findIndex((x) => x.id === tag.id);
    this.currentTag = this.copies[this.currentIndex];
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
      if (!arrayUtil.sameElements(this.tags[i].entries, this.copies[i].entries)) {
        return false;
      }
    }
    return true;
  }

  onEntriesChanged(): void {
    this.hasChanges = !this.tagsAreIdentical();
  }

  onDeleteCategory($event: Tag): void {
    this.store.dispatch(new DeleteTag($event.id!));
  }

  onNewTag(): void {
    console.log('new');
  }

  private updateStore(): void {
    if (this.hasChanges) {
      for (let i = 0; i < this.copies.length; i++) {
        if (!arrayUtil.sameElements(this.tags[i].entries, this.copies[i].entries)) {
          // const tagUpdate: Update<Tag> = this.createTagUpdate(this.copies[i]);
          // todo use "updateTags" (many) !!!
          this.store.dispatch(new UpdateTag(this.copies[i]));
          // this.store.dispatch(updateTag({tagUpdate: tagUpdate}));
        }
      }
    }
  }

}
