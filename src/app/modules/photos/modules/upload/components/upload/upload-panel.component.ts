import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatListRemovePaddingDirective } from "@app/common/directives/mat-list-remove-padding.directive";
import { parseExif } from "@app/common/util/date-util";
import { AddPhoto } from "@modules/photos/store/photos/photo.actions";
import { Tag, TagGroup } from "@modules/photos/store/tags/tag.model";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { from, Observable, ObservedValueOf } from "rxjs";

@Component({
  selector: 'app-upload-panel',
  templateUrl: './upload-panel.component.html',
  styleUrls: ['./upload-panel.component.scss'],
  standalone: true,
  imports: [MatCardModule, NgScrollbar, MatListModule, MatListRemovePaddingDirective, NgFor, MatChipsModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule, FormsModule, NgIf, MatButtonModule, AsyncPipe]
})
export class UploadPanelComponent implements OnInit {

  @ViewChild('fileInput')
  input!: ElementRef;

  @Select(TagState.getTagGroups)
  tagGroups$: Observable<TagGroup[]>;
  tagGroups: TagGroup[];
  copies: string[][];
  index = 0;

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;

  selectedTagNames: string[] = [];

  imgUrls: string[] = [];
  imgFiles: File[];
  actions: AddPhoto[] = [];
  count = 0;
  isPrivate = false;

  constructor(private renderer: Renderer2,
              private store: Store) {
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => this.user = user);
    this.tagGroups$.subscribe((groups) => {
      this.tagGroups = groups;
      this.copyTags(groups);
    });
  }

  private copyTags(groups: TagGroup[]): void {
    this.copies = [];
    for (const group of groups) {
      const tagNames: string[] = [];
      this.copies.push(tagNames);
      for (const tag of group.tags) {
        tagNames.push(tag.name);
      }
    }
  }

  openFile(): void {
    this.renderer.selectRootElement(this.input.nativeElement).click();
  }

  onChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    this.imgFiles = Array.from(files);
    this.count = this.imgFiles.length;
    for (const file of this.imgFiles) {
      const reader = new FileReader();
      reader.onload = (e: any): void => {
        this.imgUrls.push(e.target.result);
      };
      reader.onerror = (e: any): void => {
        console.log('File could not be read: ' + reader.error?.code);
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.imgFiles) {
      let recordDate$: Observable<ObservedValueOf<Promise<Date>>>;
      for (const file of this.imgFiles) {
        recordDate$ = from(this.getExifDate(file));
        recordDate$.subscribe(date => {
          this.store.dispatch(
            new AddPhoto(file, this.user, this.findTags(this.selectedTagNames), date, this.isPrivate));
        });
      }
    }
  }

  onGroupSelect(index: number): void {
    this.index = index;
  }

  onSelectChip(tagName: string): void {
    this.selectedTagNames.push(tagName);
    const index = this.copies[this.index].indexOf(tagName);
    this.copies[this.index].splice(index, 1);
  }

  private findTags(tagNames: string[]): Tag[] {
    const flat: Tag[] = [];
    const result: Tag[] = [];
    for (const tagGroup of this.tagGroups) {
      for (const tag of tagGroup.tags) {
        flat.push(tag);
      }
    }
    for (const tagName of tagNames) {
      result.push(flat.find((tag) => tag.name === tagName)!);
    }
    return result;
  }

  private async getExifDate(file: File): Promise<Date> {
    // todo re-enable
    // let exifDate:  string | string[] | ExifReader.XmpTags | ExifReader.XmpTag[] | undefined;
    // let value: string | ExifReader.XmpTag | ExifReader.XmpTags;
    //
    // try {
    //   const tags = await ExifReader.load(file);
    //   exifDate = tags.DateTimeOriginal?.value;
    //   if (!exifDate) {
    //     return new Date(file.lastModified);
    //   }
    // } catch (e: any) {
    //   console.log('exif reader error: ', e)
    //   return new Date(file.lastModified);
    // }
    // if (Array.isArray(exifDate)) {
    //   value = exifDate[0]
    // } else {
    //   value = exifDate;
    // }

    // if (this.isWrongFormat(value)) {
    //   return this.fixExif(value);
    // }
    // return new Date(value);
    throw new Error('fix XmpTags tasks')
    // return new Date(value);
  }

  // need for exif dates like '2013:05:01 07:15:28'
  private fixExif(date: string): Date {
    date = date.slice(0, 10);
    return parseExif(date);
  }

  readonly REGEX = '^([1-2][0-9]{3}):[0-1][0-9]:[0-3][0-9]';

  // test dates like '2013:05:01 07:15:28' checks only date, not time
  private isWrongFormat(value: string): boolean {
    const pattern = new RegExp(this.REGEX);
    return pattern.test(value);
  }
}
