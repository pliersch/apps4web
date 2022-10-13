import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { Observable, of } from "rxjs";
import { Tag } from "@gallery/store/tags/tag.model";
import { LoadTags } from "@gallery/store/tags/tag.action";
import { AddPhoto } from "@gallery/store/photos/photo.actions";
import { TagService } from "@gallery/services/tag.service";
import { PhotoService } from "@gallery/services/photo.service";

const PLACEHOLDER_URL = 'assets/svg/image-placeholder.svg';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})

export class GalleryUploadComponent implements OnInit {

  @ViewChild('fileInput')
  input!: ElementRef;

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;
  tags: Tag[];

  tagEntries$: Observable<string[]>;
  selectedTags: string[] = [];

  imgUrls: string[] = [PLACEHOLDER_URL];
  imgFiles: File[];
  allCategories: string[] = [];
  actions: AddPhoto[] = [];

  constructor(private renderer: Renderer2,
              private photoService: PhotoService,
              private tagService: TagService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTags());
    this.tags$.subscribe(tags => {
      this.tags = tags;
      for (const tag of tags) {
        this.allCategories.push(tag.tagName);
      }
    });
  }

  openFile(): void {
    // TODO look in chat upload. there is a better solution
    this.renderer.selectRootElement(this.input.nativeElement).click();
  }

  onChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    this.imgFiles = Array.from(files);
    for (const file of this.imgFiles) {
      this.actions.push(new AddPhoto(file, this.selectedTags, file.lastModified));
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

  onCategorySelect(tag: Tag): void {
    this.tagEntries$ = of(tag.entries);
  }

  isSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  onSelectChip(tag: string): void {
    this.selectedTags.includes(tag) ?
      this.selectedTags = this.selectedTags.filter(item => item !== tag) :
      this.selectedTags.push(tag);
  }

}
