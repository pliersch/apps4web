import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { Observable, of } from "rxjs";
import { Tag, TagGroup } from "@gallery/store/tags/tag.model";
import { LoadTags } from "@gallery/store/tags/tag.action";
import { AddPhoto } from "@gallery/store/photos/photo.actions";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";
import { UserState } from "@modules/user-managaer/store/user.state";
import { User } from "@modules/user-managaer/store/user";

const PLACEHOLDER_URL = 'assets/svg/image-placeholder.svg';

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

  @Select(UserState.getUser)
  user$: Observable<User>;
  user: User;

  tags$: Observable<Tag[]>;
  selectedTags: Tag[] = [];

  imgUrls: string[] = [PLACEHOLDER_URL];
  imgFiles: File[];
  allTagGroups: string[] = [];
  actions: AddPhoto[] = [];

  constructor(private renderer: Renderer2,
              private photoService: PhotoService,
              private tagService: TagService,
              private store: Store) {
  }

  ngOnInit(): void {
    // this.store.dispatch(new LoadTags());
    this.user$.subscribe((user) => this.user = user);
    this.tagGroups$.subscribe(tags => {
      this.tagGroups = tags;
      for (const tag of tags) {
        this.allTagGroups.push(tag.name);
      }
    });
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
    for (const file of this.imgFiles) {
      this.actions.push(new AddPhoto(file, this.user, this.selectedTags, file.lastModified));
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
      this.store.dispatch(this.actions);
    }
  }

  onGroupSelect(tag: TagGroup): void {
    this.tags$ = of(tag.tags);
  }

  isSelected(tag: Tag): boolean {
    return this.selectedTags.includes(tag);
  }

  onSelectChip(tag: Tag): void {
    this.selectedTags.includes(tag) ?
      this.selectedTags = this.selectedTags.filter(item => item !== tag) :
      this.selectedTags.push(tag);
  }

}
