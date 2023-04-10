import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { difference } from "@app/common/util/array-utils";
import {
  EditorPhotoControlComponent,
  EditPhotoPropertiesDialogData,
  EditPhotoPropertiesDialogResult,
  GalleryDeletePhotoComponent,
  GalleryEditPhotosComponent,
  GalleryManageTagsComponent,
} from "@gallery/modules/explorer/";
import {
  AbstractExplorerComponent
} from "@gallery/modules/explorer/pages/abstract-explorer/abstract-explorer.component";
import { PhotoService } from "@gallery/services/photo.service";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoFactory, PhotoUpdate } from '@gallery/store/photos/photo.model';

import { Tag, TagGroup } from "@gallery/store/tags/tag.model";
import { TagState } from "@gallery/store/tags/tag.state";
import { Action } from "@modules/action-bar/actions";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

export interface DeletePhotoDialogData {
  photo: Photo;
}

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection,
  EditPhotos,
  DeleteMany,
  ManageTags,
}

@Component({
  selector: 'app-gallery-editor',
  templateUrl: './gallery-editor.component.html',
  styleUrls: ['./gallery-editor.component.scss']
})
export class GalleryEditorComponent extends AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(EditorPhotoControlComponent, {read: ElementRef})
  photoControls!: QueryList<ElementRef>;

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>
  tags: Tag[]

  @Select(TagState.getTagGroups)
  tagGroups$: Observable<TagGroup[]>
  tagGroups: TagGroup[]

  actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', description: 'select all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', description: 'toggle selection', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', description: 'deselect all', handler: this},
    {name: ActionTypes.EditPhotos, icon: 'edit', description: 'edit photos', handler: this},
    {name: ActionTypes.DeleteMany, icon: 'delete', description: 'delete photos', handler: this},
    {name: ActionTypes.ManageTags, icon: 'list', description: 'manage tags', handler: this},
  ]

  constructor(
    public photoService: PhotoService,
    public router: Router,
    public dialog: MatDialog,
    public store: Store,
  ) {
    super(photoService, router, dialog, store);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.add(this.tagGroups$.subscribe(res => this.tagGroups = res));
    this.subscription.add(this.tags$.subscribe(res => this.tags = res));
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onAction(action: Action): void {
    switch (action.name) {
      case ActionTypes.SelectAll:
        this.store.dispatch(new photoAction.SelectAllFilteredPhotosEdit());
        break;
      case ActionTypes.DeselectAll:
        this.store.dispatch(new photoAction.DeselectAllPhotosEdit());
        break;
      case ActionTypes.ToggleSelection:
        this.store.dispatch(new photoAction.ToggleSelection());
        break;
      case ActionTypes.DeleteMany:
        this.deletePhotos();
        break;
      case ActionTypes.EditPhotos:
        this.editTags(this.selection);
        break;
      case ActionTypes.ManageTags:
        this.openEditTagDialog();
        break;
    }
  }

  onSelectForEdit($event: Photo): void {
    this.editTags([$event]);
  }

  onSelectGroupEdit($event: Photo): void {
    this.store.dispatch(new photoAction.TogglePhotoEdit($event));
  }

  onSelectForPreview($event: Photo): void {
    this.setCurrent($event);
    void this.router.navigate(['gallery/slideshow']);
  }

  onSelectForDelete($event: Photo): void {
    this.openDeletePhotoDialog($event);
  }

  onClickClearFilter(): void {
    this.store.dispatch(new photoAction.ClearFilter())
  }

  scrollToActiveItem(): void {
    const elementRef = this.photoControls.get(this.currentIndex);
    if (elementRef) {
      void this.scrollbar.scrollToElement(elementRef.nativeElement, {
        duration: 0
      });
    }
  }

  private deletePhotos(): void {
    const ids: string[] = [];
    this.selection.forEach((photo) => ids.push(photo.id));
    this.store.dispatch(new photoAction.DeletePhotos(ids));
  }

  private openDeletePhotoDialog($event: Photo): void {
    const dialogRef = this.dialog.open(GalleryDeletePhotoComponent, {
      data: {photo: $event},
      width: '300px',
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new photoAction.DeletePhoto($event.id));
      }
    });
  }

  private editTags(photos: Photo[]): void {
    const dialogData: EditPhotoPropertiesDialogData = {
      tags: this.computeTagsOfPhotos(photos),
      availableTags: this.tagGroups
    };
    const dialogRef = this.dialog.open(GalleryEditPhotosComponent, {
      data: dialogData,
      width: '600px',
      // height: '400px',
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTagsOfSelectedPhotos(photos, result);
      }
    });
  }

  private computeTagsOfPhotos(photos: Photo[]): Tag[] {
    const res: Tag[] = [];
    for (const pic of photos) {
      res.push(...pic.tags);
    }
    return Array.from(new Set(res));
  }

  private openEditTagDialog(): void {
    this.dialog.open(GalleryManageTagsComponent, {
      width: '800px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  private updateTagsOfSelectedPhotos(photos: Photo[], res: EditPhotoPropertiesDialogResult): void {
    for (const photo of photos) {
      const photoUpdate: PhotoUpdate = PhotoFactory.createPhotoUpdate([], [], res.isPrivate)
      let tagIds: string[];
      tagIds = difference(this.getIdsOfTags(res.addedTags), this.getIdsOfTags(photo.tags));
      if (tagIds.length > 0) {
        photoUpdate.addedTagIds = tagIds;
      }
      tagIds = this.getIdsOfTags(res.removedTags);
      if (tagIds.length > 0) {
        photoUpdate.removedTagIds = tagIds;
      }
      this.store.dispatch(new photoAction.UpdatePhoto(photo, photoUpdate));
    }
    this.store.dispatch(new photoAction.DeselectAllPhotosEdit());
  }

  private getIdsOfTags(tags: Tag[]): string[] {
    const ids: string[] = [];
    tags.forEach(tag => ids.push(tag.id));
    return ids;
  }

}
