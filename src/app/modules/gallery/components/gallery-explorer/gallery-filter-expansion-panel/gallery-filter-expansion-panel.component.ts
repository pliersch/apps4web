import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@gallery/store/tags/tag.model';
import { allTags, TagState } from '@gallery/store/tags/tag.selectors';
import { Store } from '@ngrx/store';
import { addTag, loadTags } from '@gallery/store/tags/tag.actions';
import { MatDialog } from '@angular/material/dialog';
import { GalleryEditTagsComponent } from '@gallery/components/gallery-explorer/gallery-edit-tags/gallery-edit-tags.component';

@Component({
  selector: 'app-gallery-filter-expansion-panel',
  templateUrl: './gallery-filter-expansion-panel.component.html',
  styleUrls: ['./gallery-filter-expansion-panel.component.scss']
})
export class GalleryFilterExpansionPanelComponent implements OnInit {

  step = 0;
  tags: Observable<Tag[]> = this.store.select(allTags);
  tagArray: Tag[] = [];

  constructor(private store: Store<TagState>,
              public dialog: MatDialog) {
    this.tags.subscribe(tags => {
      this.tagArray = tags;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadTags());
  }

  setStep(index: number): void {
    this.step = index;
  }

  openNewTagDialog(): void {
    const tag = {} as Tag;
    tag.tagName = 'Fuck2';
    tag.entries = ['you2', 'to2'];
    this.store.dispatch(addTag({ tag: tag }));
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
    this.tagArray.forEach(tag => categories.push(tag.tagName));
    return categories;
  }
}
