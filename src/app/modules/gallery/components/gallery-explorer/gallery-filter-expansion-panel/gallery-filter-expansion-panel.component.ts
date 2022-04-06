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
import {LoadTags} from "@gallery/store/tags/tag-action";

@Component({
  selector: 'app-gallery-filter-expansion-panel',
  templateUrl: './gallery-filter-expansion-panel.component.html',
  styleUrls: ['./gallery-filter-expansion-panel.component.scss']
})
export class GalleryFilterExpansionPanelComponent implements OnInit {

  @Select(TagState.getTags)
  tags: Observable<Tag[]>;

  step = 0;
  tagArray: Tag[] = [];

  constructor(private store: Store,
              public dialog: MatDialog) {
    this.tags.subscribe(tags => {
      console.log('GalleryFilterExpansionPanelComponent : ', tags)
      this.tagArray = tags;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTags());
  }

  setStep(index: number): void {
    this.step = index;
  }

  openNewTagDialog(): void {
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
    this.tagArray.forEach(tag => categories.push(tag.tagName));
    return categories;
  }
}
