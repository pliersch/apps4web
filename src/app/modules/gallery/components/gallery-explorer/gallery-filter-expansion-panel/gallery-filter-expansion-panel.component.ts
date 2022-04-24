import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '@gallery/store/tags/tag.model';
import {Select, Store} from '@ngxs/store';
import {addTag} from '@gallery/store/tags/tag.actions';
import {MatDialog} from '@angular/material/dialog';
import {
  GalleryEditTagsComponent
} from '@gallery/components/gallery-explorer/gallery-edit-tags/gallery-edit-tags.component';
import {TagState} from "@gallery/store/tags/tag-state";
import {AddTagFilter, LoadTags, RemoveTagFilter} from "@gallery/store/tags/tag-action";
import {
  GalleryNewTagCategoryComponent
} from "@gallery/components/gallery-explorer/gallery-new-tag-category/gallery-new-tag-category.component";

@Component({
  selector: 'app-gallery-filter-expansion-panel',
  templateUrl: './gallery-filter-expansion-panel.component.html',
  styleUrls: ['./gallery-filter-expansion-panel.component.scss']
})
export class GalleryFilterExpansionPanelComponent implements OnInit {

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;

  @Select(TagState.getActiveTags)
  activeTags$: Observable<string[]>;

  tags: Tag[] = [];
  activeTags: string[] = [];
  step = 0;

  constructor(private store: Store,
              public dialog: MatDialog) {
    this.tags$.subscribe(tags => {
      this.tags = tags;
    });
    this.activeTags$.subscribe(tags => {
      this.activeTags = tags;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTags());
  }

  setStep(index: number): void {
    this.step = index;
  }

  openNewTagDialog(): void {
    this.dialog.open(GalleryNewTagCategoryComponent, {
      // minWidth: '600px',
      width: '500px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
    const tag = {} as Tag;
    tag.tagName = 'Fuck2';
    tag.entries = ['you2', 'to2'];
    this.store.dispatch(addTag({tag: tag}));
  }

  openEditTagDialog(): void {
    this.dialog.open(GalleryEditTagsComponent, {
      // minWidth: '600px',
      width: '800px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  collectCategories(): string[] {
    const categories: string[] = [];
    this.tags.forEach(tag => categories.push(tag.tagName));
    return categories;
  }

  onSelectionChange(entry: string): void {
    if (this.isTagActivated(entry)) {
      this.store.dispatch(new RemoveTagFilter(entry));
    } else {
      this.store.dispatch(new AddTagFilter(entry));
    }
  }

  isTagActivated(entry: string): boolean {
    return this.activeTags.includes(entry);
  }

}
