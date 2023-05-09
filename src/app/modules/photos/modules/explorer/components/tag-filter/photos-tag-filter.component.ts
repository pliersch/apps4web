import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoCountByTag } from "@modules/photos/store/photos/photo.model";
import { Tag, TagGroup } from '@modules/photos/store/tags/tag.model';

@Component({
  selector: 'app-photos-tag-filter',
  templateUrl: './photos-tag-filter.component.html',
  styleUrls: ['./photos-tag-filter.component.scss']
})
export class PhotosTagFilterComponent {

  @Input()
  tagGroups: TagGroup[] = [];

  @Input()
  activeTags: Tag[] = [];

  @Input()
  photoCounts: PhotoCountByTag[] = [];

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

  // fixme calls to often from template
  // getPhotoCount(tagId: string): string {
  //   console.log('PhotosTagFilterComponent getPhotoCount: ', tagId)
  //   const countByTag = this.photoCounts.find(el => el.tagId === tagId);
  //   const count = countByTag?.count;
  //   return count ? count.toString() : '';
  // }

}
