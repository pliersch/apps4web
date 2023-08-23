import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SetCheckedInstruction } from "@app/core/stores/app/app.actions";
import { Action } from "@modules/action-bar/actions";
import { ExplorerPhotoControlComponent } from "@modules/photos/modules/explorer";
import {
  ExplorerInstructionDialogComponent
} from "@modules/photos/modules/explorer/components/explorer-instruction-dialog/explorer-instruction-dialog.component";
import { SortMode } from "@modules/photos/modules/explorer/components/sorter/photos-sorter.component";
import {
  AbstractExplorerComponent
} from "@modules/photos/modules/explorer/pages/abstract-explorer/abstract-explorer.component";
import { PhotoService } from "@modules/photos/services/photo.service";
import * as photoAction from "@modules/photos/store/photos/photo.actions";
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select, Store } from "@ngxs/store";
import { saveAs } from 'file-saver';
import { Observable } from "rxjs";

@Component({
  selector: 'app-photos-explorer',
  templateUrl: './photos-explorer.component.html',
  styleUrls: ['./photos-explorer.component.scss']
})
export class PhotosExplorerComponent extends AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(ExplorerPhotoControlComponent, {read: ElementRef})
  photoControls!: QueryList<ElementRef>;

  @Select(PhotoState.getFilteredDownloadablePhotos)
  downloadablePhotos$: Observable<Photo[]>;

  instructionDialogComponent = ExplorerInstructionDialogComponent;
  availableActions: Action[] = [
    {name: "SelectAll", icon: 'done_all', description: 'Alles auswählen', handler: this},
    {name: "ToggleSelection", icon: 'published_with_changes', description: 'Auswahl umkehren', handler: this},
    {name: "DeselectAll", icon: 'remove_done', description: 'Auswahl aufheben', handler: this},
    {name: "AddToDownload", icon: 'add', description: 'zu Downloads hinzufügen', handler: this},
    {name: "Download", icon: 'download', description: 'Download', handler: this},
  ];

  constructor(
    public photoService: PhotoService,
    public router: Router,
    public dialog: MatDialog,
    public store: Store,
  ) {
    super(photoService, router, dialog, store);
    // hack to disable instruction
    this.store.dispatch(new SetCheckedInstruction(this.constructor.name));
  }

  onAction(action: Action): void {
    switch (action.name) {
      case "SelectAll":
        this.store.dispatch(new photoAction.SelectAllDownloads());
        break;
      case "DeselectAll":
        this.store.dispatch(new photoAction.DeselectAllDownloads());
        break;
      case "ToggleSelection":
        this.store.dispatch(new photoAction.ToggleAllDownload());
        break;
      case "AddToDownload":
        this.store.dispatch(new photoAction.MoveToFinalDownloads());
        break;
      case "Download":
        this.downloadPhotos();
        break;
    }
  }

  handleChangeSorting($event: SortMode): void {
    this.store.dispatch(new photoAction.SetSortMode($event));
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new photoAction.TogglePhotoDownload($event));
  }

  onSelectForPreview($event: Photo): void {
    this.setCurrent($event);
    void this.router.navigate(['photos/slideshow/:id']);
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

  private downloadPhotos(): void {
    this.photoService.download(this.selectedDownloads)
      .subscribe((blob) => {
        saveAs(blob, 'photos.zip')
        this.store.dispatch(new photoAction.DeselectAllDownloads())
      })
  }
}
