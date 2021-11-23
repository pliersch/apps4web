import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {allTags, TagState} from '@gallery/store/tags/tag.selectors';
import {Observable} from 'rxjs';
import {Tag} from '@gallery/store/tags/tag.model';
import {MatDialogRef} from '@angular/material/dialog';
import {GalleryEditTagDetailComponent} from '@gallery/components/gallery-explorer/gallery-edit-tags/gallery-edit-tag-detail/gallery-edit-tag-detail.component';
import {Update} from '@ngrx/entity';
import {MatSelectionList} from '@angular/material/list';
import {arrayUtil} from '@app/util/array-utils';
import {deleteTag, updateTag} from '@gallery/store/tags/tag.actions';

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

  tagsObserver: Observable<Tag[]> = this.store.select(allTags);
  tags: Tag[] = [];
  copies: Tag[] = [];
  currentTag: Tag;
  currentIndex = 0;
  hasChanges: boolean = false;

  constructor(private store: Store<TagState>,
              public dialogRef: MatDialogRef<GalleryEditTagsComponent>) {
  }

  ngOnInit(): void {
    this.tagsObserver.subscribe(tagArray => {
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
    // @ts-ignore
    this.store.dispatch(deleteTag({id: $event.id}));
  }

  onNewTag(): void {
    console.log('new');
  }

  private updateStore(): void {
    if (this.hasChanges) {
      for (let i = 0; i < this.copies.length; i++) {
        if (!arrayUtil.sameElements(this.tags[i].entries, this.copies[i].entries)) {
          const tagUpdate: Update<Tag> = this.createTagUpdate(this.copies[i]);
          // todo use "updateTags" (many) !!!
          this.store.dispatch(updateTag({tagUpdate: tagUpdate}));
        }
      }
    }
  }

  private createTagUpdate(tag: Tag): Update<Tag> {
    return {
      // @ts-ignore
      id: tag.id,
      changes: {
        entries: tag.entries
      }
    };
  }
}
