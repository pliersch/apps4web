import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Action, ActionProvider } from "@app/models/actions";
import { ActionBarService } from "@app/services/action-bar.service";
import { saveAs } from 'file-saver';
import {
  DeletePhotoAction,
  DeselectAllPhotosAction, LoadMetaDataAction, LoadPhotosAction,
  SelectAllPhotosAction,
  SelectManyPhotosAction,
  SetTagsOfPicture,
  TogglePhotoDownloadAction,
  TogglePhotosDownloadAction
} from "@gallery/store/photos/photo.actions";
import { AreaSelection, AreaSelectionHandler } from "@gallery/components/gallery-explorer/area-selection";
import {
  GalleryEditImageTagsComponent
} from "@gallery/components/gallery-explorer/gallery-edit-image-tags/gallery-edit-image-tags.component";
import { MatDialog } from "@angular/material/dialog";
import { PhotoService } from "@gallery/services/photo.service";
import { NgScrollbar } from "ngx-scrollbar";
import { map, tap } from "rxjs/operators";
import { PageOptionsDto } from "@app/common/dto/page-options.dto";
import { PageMetaDto } from "@app/common/dto/page-meta.dto";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";

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
export class GalleryExplorerComponent implements OnInit, AfterViewInit, OnDestroy, ActionProvider, AreaSelectionHandler {

  @ViewChild(NgScrollbar)
  scrollbarRef: NgScrollbar;

  @Select(PhotoState.getPageMetaData)
  pageMeta$: Observable<PhotoMetaDataDto>;
  pageMeta: PhotoMetaDataDto;

  @Select(PhotoState.getPhotos)
  pictures$: Observable<Photo[]>;
  pictures: Photo[];

  @Select(PhotoState.getSelectedPictures)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  currentImage: Photo;
  showFilter = true;
  page = 1;
  absoluteHeight = 0;
  private isRequesting: boolean;
  private resizeObserver: ResizeObserver;

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
              private ngZone: NgZone,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadMetaDataAction());
    this.store.dispatch(new LoadPhotosAction(new PageOptionsDto(this.page++, 30)));
    this.actionBarService.setActions(this.actions);
    this.selection$.subscribe(res => this.selection = res);
    this.pictures$.subscribe(res => {
      this.pictures = res;
      console.log('check receive res -> requesting is false')
      this.isRequesting = false;
    });
    this.pageMeta$.subscribe(meta => {
      this.pageMeta = meta;
      console.log('GalleryExplorerComponent : ', meta)
      // if (!meta.hasNextPage) {
      //   this.resizeObserver.unobserve(this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content')!)
      // }
    });
    this.initializeSelectionArea();
  }

  ngAfterViewInit(): void {
    this.observeScrollContent();
    this.scrollbarRef.verticalScrolled.pipe(
      tap((e: Event) => {
        this.detectAndFetch(e.target as Element);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.actionBarService.removeActions();
  }

  observeScrollContent(): void {
    let element = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content');
    this.resizeObserver = new ResizeObserver(res => {
      console.log(' check absolute height change: ', res[0].contentRect.height);
      this.absoluteHeight = res[0].contentRect.height;
    });
    this.resizeObserver.observe(element!);
  }

  setCurrent(image: Photo): void {
    this.currentImage = image;
  }

  // todo: find a better name
  detectAndFetch(element: Element): void {
    const currentHeight = element.clientHeight + element.scrollTop /* + element.scrollTop*/;
    // console.log('element.scrollTop', element.scrollTop)
    // console.log('currentHeight', currentHeight)
    // console.log('maxHeight', this.absoluteHeight)
    // console.log('scrollHeight', element.scrollHeight)
    if (currentHeight + 180 > this.absoluteHeight && !this.isRequesting) {
      // if (this.absoluteHeight != element.scrollHeight) {
      // console.log('check height: ' + (currentHeight + 180) +
      //   ' is larger then abs height: ' + this.absoluteHeight + ' is requesting true')
      this.isRequesting = true;
      console.log('XX Store dispatch')
      this.store.dispatch(new LoadPhotosAction(new PageOptionsDto(this.page++, 30)));
      // }
    }
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
