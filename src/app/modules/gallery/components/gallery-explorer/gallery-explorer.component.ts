import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {Action, ActionProvider} from "@app/models/actions";
import {ActionBarService} from "@app/services/action-bar.service";
import {saveAs} from 'file-saver';
import {
  DeletePhotoAction,
  DeselectAllPhotosAction,
  SelectAllPhotosAction,
  SelectManyPhotosAction,
  SetTagsOfPicture,
  TogglePhotoDownloadAction,
  TogglePhotosDownloadAction
} from "@gallery/store/photos/photo-actions";
import {AreaSelection, AreaSelectionHandler} from "@gallery/components/gallery-explorer/area-selection";
import {PhotoService} from "@app/core/services/photo.service";
import {
  GalleryEditImageTagsComponent
} from "@gallery/components/gallery-explorer/gallery-edit-image-tags/gallery-edit-image-tags.component";
import {MatDialog} from "@angular/material/dialog";

export interface DialogData {
  tags: string[];
}

export interface DialogResult {
  addedTags: string[];
  removedTags: string[];
}

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection,
  Download,
  EditTags
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit, OnDestroy, ActionProvider, AreaSelectionHandler {

  @Select(PhotoState.getPhotos)
  pictures$: Observable<Photo[]>;
  pictures: Photo[];

  @Select(PhotoState.getSelectedPictures)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  currentImage: Photo;
  showFilter = true;

  private areaSelection: AreaSelection;

  private actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
    {name: ActionTypes.Download, icon: 'download', tooltip: 'download', handler: this},
    {name: ActionTypes.EditTags, icon: 'edit', tooltip: 'edit tags', handler: this},
  ]

  constructor(private actionBarService: ActionBarService,
              private photoService: PhotoService,
              public dialog: MatDialog,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
    this.selection$.subscribe(res => this.selection = res);
    this.pictures$.subscribe(res => this.pictures = res);
    this.initializeSelectionArea();
  }

  ngOnDestroy(): void {
    this.actionBarService.removeActions();
  }

  setCurrent(image: Photo): void {
    this.currentImage = image;
  }

  onAction(action: Action): void {
    switch (action.name) {
      case ActionTypes.SelectAll:
        this.store.dispatch(new SelectAllPhotosAction());
        break;
      case ActionTypes.DeselectAll:
        this.store.dispatch(new DeselectAllPhotosAction());
        break;
      case ActionTypes.ToggleSelection:
        this.store.dispatch(new TogglePhotosDownloadAction());
        break;
      case ActionTypes.Download:
        this.downloadPictures();
        break;
      case ActionTypes.EditTags:
        this.editTags();
        break;
    }
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new TogglePhotoDownloadAction($event));
  }

  onSelectForDelete($event: Photo): void {
    this.store.dispatch(new DeletePhotoAction($event.id));
  }

  isSelected(photo: Photo): boolean {
    return this.selection.includes(photo);
  }

  private initializeSelectionArea(): void {
    this.areaSelection = new AreaSelection(this);
  }

  onSelectionFinish(photoFileNames: string[]): void {
    let photos: Photo[] = [];
    for (const fileName of photoFileNames) {
      let photo = this.pictures.find(img => img.fileName == fileName);
      if (photo) {
        photos.push(photo);
      } else {
        console.log('GalleryExplorerComponent err why cant find the id?: ', fileName)
      }
    }
    this.store.dispatch(new SelectManyPhotosAction(photos));
  }

  private downloadPictures(): void {
    this.photoService.download(this.selection)
      // TODO use fileName of response
      .subscribe(blob => saveAs(blob, 'archive.zip'));
  }

  private editTags(): void {
    let dialogRef = this.dialog.open(GalleryEditImageTagsComponent, {
      data: {tags: this.computeAvailableTagsOfPictures()},
      width: '800px',
      // minWidth: '600px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateTagsOfSelectedPictures(result);
    });
  }

  private computeAvailableTagsOfPictures(): string[] {
    let res: string[] = [];
    for (const pic of this.selection) {
      res.push(...pic.tags);
    }
    return Array.from(new Set(res));
  }

  private updateTagsOfSelectedPictures(res: DialogResult): void {
    if (!res) {
      return;
    }

    let tags: string[] = [];
    for (const photo of this.selection) {
      tags = photo.tags.filter(x => !res.removedTags.includes(x));
      tags = tags.filter(x => !res.addedTags.includes(x))
        .concat(res.addedTags.filter(x => !tags.includes(x)));
      this.store.dispatch(new SetTagsOfPicture(photo, tags));
    }
  }

}
