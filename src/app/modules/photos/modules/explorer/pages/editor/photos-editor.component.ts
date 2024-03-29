import { AsyncPipe, NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { difference } from "@app/common/util/array-utils";
import { Action } from "@app/core/interfaces/action";
import { SetCheckedInstruction } from "@app/core/stores/app/app.actions";
import { Role } from "@modules/admin/modules/user/store/role";
import {
  EditorPhotoControlComponent,
  EditPhotoPropertiesDialogData,
  EditPhotoPropertiesDialogResult,
  PhotosActionPanelComponent,
  PhotosDateFilterComponent,
  PhotosDeletePhotoComponent,
  PhotosEditPhotosComponent,
  PhotosImageDetailComponent,
  PhotosManageTagsComponent,
  PhotosMetaPanelEditorComponent,
  PhotosRatingFilterComponent,
  PhotosTagFilterComponent
} from "@modules/photos/modules/explorer";
import {
  EditorInstructionDialogComponent
} from "@modules/photos/modules/explorer/components/editor-instruction-dialog/editor-instruction-dialog.component";
import {
  AbstractExplorerComponent
} from "@modules/photos/modules/explorer/pages/abstract-explorer/abstract-explorer.component";
import { PhotoService } from "@modules/photos/services/photo.service";
import * as photoAction from "@modules/photos/store/photos/photo.actions";
import { Photo, PhotoFactory, PhotoUpdate } from '@modules/photos/store/photos/photo.model';

import { Tag, TagGroup } from "@modules/photos/store/tags/tag.model";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from "rxjs";

import {
  EditorPhotoControlComponent as EditorPhotoControlComponent_1
} from '../../components/editor-photo-control/editor-photo-control.component';

export interface DeletePhotoDialogData {
  photo: Photo;
}

@Component({
  selector: 'app-photos-editor',
  templateUrl: './photos-editor.component.html',
  styleUrls: ['./photos-editor.component.scss'],
  standalone: true,
  imports: [PhotosTagFilterComponent, PhotosRatingFilterComponent, PhotosDateFilterComponent, MatButtonModule, MatIconModule, PhotosActionPanelComponent, PhotosImageDetailComponent, PhotosMetaPanelEditorComponent, NgScrollbar, NgFor, EditorPhotoControlComponent_1, AsyncPipe]
})
export class PhotosEditorComponent extends AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(EditorPhotoControlComponent, {read: ElementRef})
  photoControls!: QueryList<ElementRef>;

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>
  tags: Tag[]

  @Select(TagState.getTagGroups)
  tagGroups$: Observable<TagGroup[]>
  tagGroups: TagGroup[]

  instructionDialogComponent = EditorInstructionDialogComponent;
  availableActions: Action[] = [
    {name: "SelectAll", icon: 'done_all', description: 'Alles auswählen', handler: this},
    {name: "ToggleSelection", icon: 'published_with_changes', description: 'Auswahl umkehren', handler: this},
    {name: "DeselectAll", icon: 'remove_done', description: 'Auswahl aufheben', handler: this},
    {name: "EditPhotos", icon: 'edit', description: 'Bearbeiten', role: Role.Admin, handler: this},
    {name: "DeleteMany", icon: 'delete', description: 'Löschen', role: Role.Admin, handler: this},
    {name: "ManageTags", icon: 'list', description: 'Manage Tags', role: Role.Admin, handler: this},
  ];

  constructor(
    protected override photoService: PhotoService,
    protected override router: Router,
    protected override dialog: MatDialog,
    protected override store: Store,
  ) {
    super(photoService, router, dialog, store);
    // todo hack to disable instruction
    this.store.dispatch(new SetCheckedInstruction(this.constructor.name));
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.add(this.tagGroups$.subscribe(res => this.tagGroups = res));
    this.subscription.add(this.tags$.subscribe(res => this.tags = res));
  }

  onAction(action: Action): void {
    switch (action.name) {
      case "SelectAll":
        this.store.dispatch(new photoAction.SelectAllFilteredPhotosEdit());
        break;
      case "DeselectAll":
        this.store.dispatch(new photoAction.DeselectAllPhotosEdit());
        break;
      case "ToggleSelection":
        this.store.dispatch(new photoAction.ToggleSelection());
        break;
      case "DeleteMany":
        this.deletePhotos();
        break;
      case "EditPhotos":
        this.editTags(this.selection);
        break;
      case "ManageTags":
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
    void this.router.navigate(['photos/slideshow/:id']);
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
    const dialogRef = this.dialog.open(PhotosDeletePhotoComponent, {
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
    const dialogRef = this.dialog.open(PhotosEditPhotosComponent, {
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
    this.dialog.open(PhotosManageTagsComponent, {
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
