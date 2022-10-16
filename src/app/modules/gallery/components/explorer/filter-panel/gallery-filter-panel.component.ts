import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@gallery/store/tags/tag.model';
import { Select, Store } from '@ngxs/store';
import { TagState } from "@gallery/store/tags/tag.state";
import { AddTagFilter, RemoveTagFilter } from "@gallery/store/photos/photo.actions";
import { PhotoState } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-filter-panel',
  templateUrl: './gallery-filter-panel.component.html',
  styleUrls: ['./gallery-filter-panel.component.scss']
})
export class GalleryFilterPanelComponent {

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;

  @Select(PhotoState.getActiveTags)
  activeTags$: Observable<string[]>;

  tags: Tag[] = [];
  activeTags: string[] = [];
  step = 0;

  constructor(private store: Store) {
    this.tags$.subscribe(tags => {
      this.tags = tags;
    });
    this.activeTags$.subscribe(tags => {
      this.activeTags = tags;
    });
  }

  setStep(index: number): void {
    this.step = index;
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
