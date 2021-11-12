import { Component, OnInit } from '@angular/core';
import { Tag } from '@gallery/store/tags/tag.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { allTags, TagState } from '@gallery/store/tags/tag.selectors';
import { loadTags, addTag } from '@gallery/store/tags/tag.actions';


@Component({
  selector: 'app-gallery-photo-filter',
  templateUrl: './gallery-photo-filter.component.html',
  styleUrls: ['./gallery-photo-filter.component.scss']
})
export class GalleryPhotoFilterComponent implements OnInit {

  index = 0;
  tags: Observable<Tag[]> = this.store.select(allTags);
  tagArray: Tag[];

  constructor(private store: Store<TagState>) {
    this.tags.subscribe(tags => {
      this.tagArray = tags;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadTags());
  }

  createTag(): void {
    this.index = 1;
  }

  onCreateTag($event: { name: string, tag: Tag }): void {
    if ($event.name === 'submit') {
      this.store.dispatch(addTag({ tag: $event.tag}));
    }
    this.index = 0;
  }
}
