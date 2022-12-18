import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { saveAs } from 'file-saver';
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { AbstractExplorerComponent } from "@gallery/components/share/abstract-explorer/abstract-explorer.component";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { PhotoService } from "@gallery/services/photo.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngxs/store";

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
    {name: ActionTypes.Add, icon: 'add', description: 'add', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', description: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', description: 'toggle selection', handler: this},
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
        this.store.dispatch(new photoAction.AddToDownload(this.photos));
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
    return this.downloads.includes(photo);
  }

  private downloadPhotos(): void {
    this.photoService.download(this.downloads)
      .subscribe((blob) => {
        saveAs(blob, 'photos.zip')
        this.store.dispatch(new photoAction.DeselectAllDownloads())
      })
  }
}
