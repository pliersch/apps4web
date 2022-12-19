import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag, TagGroup } from '@gallery/store/tags/tag.model';
import { Select, Store } from '@ngxs/store';
import { TagState } from "@gallery/store/tags/tag.state";
import { AddTagFilter, RemoveTagFilter } from "@gallery/store/photos/photo.actions";
import { PhotoState } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-filter-panel',
  templateUrl: './gallery-tag-filter.component.html',
  styleUrls: ['./gallery-tag-filter.component.scss']
})
export class GalleryTagFilterComponent {

  @Select(TagState.getTagGroups)
  tagGroups$: Observable<TagGroup[]>;
  tagGroups: TagGroup[] = [];

  @Select(PhotoState.getActiveTags)
  activeTags$: Observable<Tag[]>;
  activeTags: Tag[] = [];

  step = 0;

  constructor(private store: Store) {
    this.tagGroups$.subscribe(tags => {
      this.tagGroups = tags;
    });
    this.activeTags$.subscribe(tags => {
      this.activeTags = tags;
    });
  }

  setStep(index: number): void {
    this.step = index;
  }

  onSelectionChange(entry: Tag): void {
    if (this.isTagActivated(entry)) {
      this.store.dispatch(new RemoveTagFilter(entry));
    } else {
      this.store.dispatch(new AddTagFilter(entry));
    }
  }

  isTagActivated(entry: Tag): boolean {
    return this.activeTags.includes(entry);
  }

}