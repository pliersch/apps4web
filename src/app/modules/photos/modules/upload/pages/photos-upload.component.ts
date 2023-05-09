import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { parseExif } from "@app/common/util/date-util";
import { PhotoService } from "@modules/photos/services/photo.service";
import { TagService } from "@modules/photos/services/tag.service";
import { AddPhoto } from "@modules/photos/store/photos/photo.actions";
import { Tag, TagGroup } from "@modules/photos/store/tags/tag.model";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import * as ExifReader from 'exifreader';
import { from, Observable, ObservedValueOf } from "rxjs";

@Component({
  selector: 'app-photos-upload',
  templateUrl: './photos-upload.component.html',
  styleUrls: ['./photos-upload.component.scss']
})

export class PhotosUploadComponent implements OnInit {

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

  // tags: Tag[];
  selectedTagNames: string[] = [];

  imgUrls: string[] = [];
  imgFiles: File[];
  actions: AddPhoto[] = [];
  count = 0;
  isPrivate = false;

  constructor(private renderer: Renderer2,
              private photoService: PhotoService,
              private tagService: TagService,
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
    let exifDate: undefined | string | Array<string>;
    let value: string | undefined;

    try {
      const tags = await ExifReader.load(file);
      exifDate = tags.DateTimeOriginal?.value;
      if (!exifDate) {
        return new Date(file.lastModified);
      }
    } catch (e: any) {
      console.log('exif reader error: ', e)
      return new Date(file.lastModified);
    }
    if (Array.isArray(exifDate)) {
      value = exifDate[0]
    } else {
      value = exifDate;
    }

    if (this.isWrongFormat(value)) {
      return this.fixExif(value);
    }
    return new Date(value);
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
