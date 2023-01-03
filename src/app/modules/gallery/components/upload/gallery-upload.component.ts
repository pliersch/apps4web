import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { Observable } from "rxjs";
import { Tag, TagGroup } from "@gallery/store/tags/tag.model";
import { AddPhoto } from "@gallery/store/photos/photo.actions";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { User } from "@account/store/user.model";
import { AccountState } from "@account/store/account.state";

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})

export class GalleryUploadComponent implements OnInit {

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

  copyTags(groups: TagGroup[]): void {
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
      for (const file of this.imgFiles) {
        this.actions.push(
          new AddPhoto(file, this.user, this.findTags(this.selectedTagNames), file.lastModified, this.isPrivate));
      }
      this.store.dispatch(this.actions);
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

  findTags(tagNames: string[]): Tag[] {
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

}
