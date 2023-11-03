import { AsyncPipe, NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { Action } from "@app/core/interfaces/action";
import { SetCheckedInstruction } from "@app/core/stores/app/app.actions";
import {
  ExplorerPhotoControlComponent,
  ExplorerPhotoControlComponent as ExplorerPhotoControlComponent_1,
  PhotosActionPanelComponent,
  PhotosDateFilterComponent,
  PhotosImageDetailComponent,
  PhotosMetaPanelExplorerComponent,
  PhotosRatingFilterComponent,
  PhotosTagFilterComponent
} from '@modules/photos/modules/explorer';

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
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from "rxjs";

import { PhotosSorterComponent } from '../../components/sorter/photos-sorter.component';

@Component({
  selector: 'app-photos-explorer',
  templateUrl: './photos-explorer.component.html',
  styleUrls: ['./photos-explorer.component.scss'],
  standalone: true,
  imports: [PhotosTagFilterComponent, PhotosRatingFilterComponent, PhotosDateFilterComponent, PhotosSorterComponent, MatButtonModule, MatIconModule, PhotosActionPanelComponent, PhotosImageDetailComponent, PhotosMetaPanelExplorerComponent, NgScrollbar, NgFor, ExplorerPhotoControlComponent_1, AsyncPipe]
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
    protected override photoService: PhotoService,
    protected override router: Router,
    protected override dialog: MatDialog,
    protected override store: Store,
  ) {
    super(photoService, router, dialog, store);
    // todo hack to disable instruction
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
