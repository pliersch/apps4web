import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@gallery/store/tags/tag.model';
import { Select, Store } from '@ngxs/store';
import { TagState } from "@gallery/store/tags/tag.state";
import { AddTagFilter, LoadTags, RemoveTagFilter } from "@gallery/store/tags/tag.action";

@Component({
  selector: 'app-gallery-filter-panel',
  templateUrl: './gallery-filter-panel.component.html',
  styleUrls: ['./gallery-filter-panel.component.scss']
})
export class GalleryFilterPanelComponent implements OnInit {

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;

  @Select(TagState.getActiveTags)
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

  ngOnInit(): void {
    this.store.dispatch(new LoadTags());
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
