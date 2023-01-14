import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  AbstractExplorerComponent
} from "@gallery/modules/explorer/components/abstract-explorer/abstract-explorer.component";
import { PhotoService } from "@gallery/services/photo.service";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo } from '@gallery/store/photos/photo.model';
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { Store } from "@ngxs/store";
import { saveAs } from 'file-saver';

enum ActionTypes {
  SelectAll,
  Add,
  DeselectAll,
  ToggleSelection,
  Download,
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent extends AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy, ActionProvider {

  actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', description: 'select all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', description: 'toggle selection', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', description: 'deselect all', handler: this},
    {name: ActionTypes.Add, icon: 'add', description: 'add to downloads', handler: this},
    {name: ActionTypes.Download, icon: 'download', description: 'download', handler: this},
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
        this.store.dispatch(new photoAction.SelectAllDownloads());
        break;
      case ActionTypes.Add:
        this.store.dispatch(new photoAction.MoveToFinalDownloads());
        break;
      case ActionTypes.DeselectAll:
        this.store.dispatch(new photoAction.DeselectAllDownloads());
        break;
      case ActionTypes.ToggleSelection:
        this.store.dispatch(new photoAction.ToggleAllDownload());
        break;
      case ActionTypes.Download:
        this.downloadPhotos();
        break;
    }
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new photoAction.TogglePhotoDownload($event));
  }

  onSelectForPreview($event: Photo): void {
    this.setCurrent($event);
    void this.router.navigate(['gallery/slideshow']);
  }

  onClickClearFilter(): void {
    this.store.dispatch(new photoAction.ClearFilter())
  }

  isDownload(photo: Photo): boolean {
    return this.selectedDownloads.includes(photo);
  }

  private downloadPhotos(): void {
    this.photoService.download(this.selectedDownloads)
      .subscribe((blob) => {
        saveAs(blob, 'photos.zip')
        this.store.dispatch(new photoAction.DeselectAllDownloads())
      })
  }
}