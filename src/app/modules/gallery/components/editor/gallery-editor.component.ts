import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Photo, PhotoUpdate } from '@gallery/store/photos/photo.model';
import * as photoAction from "@gallery/store/photos/photo.actions";
import {
  EditPhotoPropertiesDialogData,
  EditPhotoPropertiesDialogResult,
  GalleryEditPhotosComponent
} from "@gallery/components/editor/edit-photos-dialog/gallery-edit-photos.component";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import {
  GalleryNewTagGroupComponent
} from "@gallery/components/editor/new-tags-dialog/gallery-new-tag-group.component";
import {
  GalleryDeletePhotoComponent
} from "@gallery/components/editor/delete-photo-dialog/gallery-delete-photo.component";
import { AbstractExplorerComponent } from "@gallery/components/share/abstract-explorer/abstract-explorer.component";
import { Tag, TagGroup } from "@gallery/store/tags/tag.model";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { PhotoService } from "@gallery/services/photo.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { TagState } from "@gallery/store/tags/tag.state";
import { Observable } from "rxjs";
import { GalleryEditTagsComponent } from "@gallery/components/editor/manage-tags-dialog/gallery-edit-tags.component";
import { difference } from "@app/common/util/array-utils";

export interface DeletePhotoDialogData {
  photo: Photo;
}

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection,
  EditPhotos,
  DeleteMany,
  NewTag,
  ManageTags,
}

@Component({
  selector: 'app-gallery-editor',
  templateUrl: './gallery-editor.component.html',
  styleUrls: ['./gallery-editor.component.scss']
})
export class GalleryEditorComponent extends AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy, ActionProvider {

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
    {name: ActionTypes.NewTag, icon: 'playlist_add', description: 'new tag', handler: this},
    {name: ActionTypes.ManageTags, icon: 'list', description: 'manage tags', handler: this},
  ]

  constructor(
    public actionBarService: ActionBarService,
    public photoService: PhotoService,
    public router: Router,
    public dialog: MatDialog,
    public store: Store,
  ) {
    super(actionBarService, photoService, router, dialog, store);
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
      case ActionTypes.NewTag:
        this.openNewTagDialog();
        break;
      case ActionTypes.ManageTags:
        this.openEditTagDialog();
        break;
    }
  }

  private deletePhotos(): void {
    const ids: string[] = [];
    this.selection.forEach((photo) => ids.push(photo.id));
    this.store.dispatch(new photoAction.DeletePhotos(ids));
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

  isSelectForEdit(photo: Photo): boolean {
    return this.selection.includes(photo);
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
    console.log('GalleryEditorComponent editTags: ', photos)
    const dialogData: EditPhotoPropertiesDialogData = {
      tags: this.computeTagsOfPhotos(photos),
      availableTags: this.tagGroups
    };
    const dialogRef = this.dialog.open(GalleryEditPhotosComponent, {
      data: dialogData,
      width: '800px',
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateTagsOfSelectedPhotos(photos, result);
    });
  }

  private computeTagsOfPhotos(photos: Photo[]): Tag[] {
    const res: Tag[] = [];
    for (const pic of photos) {
      res.push(...pic.tags);
    }
    return Array.from(new Set(res));
  }

  private openNewTagDialog(): void {
    this.dialog.open(GalleryNewTagGroupComponent, {
      width: '500px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  private openEditTagDialog(): void {
    this.dialog.open(GalleryEditTagsComponent, {
      width: '800px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  private updateTagsOfSelectedPhotos(photos: Photo[], res: EditPhotoPropertiesDialogResult): void {
    if (!res) {
      return;
    }
    for (const photo of photos) {
      const photoUpdate: PhotoUpdate = {
        addedTagIds: [],
        removedTagIds: [],
        private: res.private
      }
      let tags: Tag[];
      tags = difference(photo.tags, res.addedTags);
      if (tags.length > 0) {
        photoUpdate.addedTagIds = this.getIdsFromTag(tags);
      }
      tags = difference(photo.tags, res.removedTags);
      if (tags.length > 0) {
        photoUpdate.removedTagIds = this.getIdsFromTag(tags);
      }
      this.store.dispatch(new photoAction.UpdatePhoto(photo, photoUpdate));
    }
    this.store.dispatch(new photoAction.DeselectAllPhotosEdit());
  }

  private getIdsFromTag(tags: Tag[]): string[] {
    const ids: string[] = [];
    tags.forEach(tag => ids.push(tag.id));
    return ids;
  }

}
