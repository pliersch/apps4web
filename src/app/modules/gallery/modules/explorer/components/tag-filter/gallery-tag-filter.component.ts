import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag, TagGroup } from '@gallery/store/tags/tag.model';

@Component({
  selector: 'app-gallery-tag-filter',
  templateUrl: './gallery-tag-filter.component.html',
  styleUrls: ['./gallery-tag-filter.component.scss']
})
export class GalleryTagFilterComponent {

  @Input()
  tagGroups: TagGroup[] = [];

  @Input()
  activeTags: Tag[] = [];

  @Output()
  addTagFilterEvent = new EventEmitter<Tag>();

  @Output()
  removeTagFilterEvent = new EventEmitter<Tag>();

  step = 0;

  setStep(index: number): void {
    this.step = index;
  }

  onSelectionChange(tag: Tag): void {
    if (this.isTagActivated(tag)) {
      this.removeTagFilterEvent.emit(tag);
    } else {
      this.addTagFilterEvent.emit(tag);
    }
  }

  isTagActivated(entry: Tag): boolean {
    return this.activeTags.includes(entry);
  }

}
