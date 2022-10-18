import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { saveAs } from 'file-saver';
import * as photoAction from "@gallery/store/photos/photo.actions";
import { ClearFilter } from "@gallery/store/photos/photo.actions";
import { AreaSelection, AreaSelectionHandler } from "@gallery/components/explorer/area-selection";
import {
  GalleryEditImageTagsComponent
} from "@gallery/components/explorer/edit-tags-dialog/gallery-edit-image-tags.component";
import { MatDialog } from "@angular/material/dialog";
import { PhotoService } from "@gallery/services/photo.service";
import { NgScrollbar } from "ngx-scrollbar";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthState } from "@modules/google-signin/store/auth.state";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import {
  GalleryNewTagCategoryComponent
} from "@gallery/components/explorer/new-tag-category/gallery-new-tag-category.component";
import { GalleryEditTagsComponent } from "@gallery/components/explorer/edit-tags/gallery-edit-tags.component";
import {
  GalleryDeletePhotoComponent
} from "@gallery/components/explorer/delete-photo-dialog/gallery-delete-photo.component";

export interface DeletePhotoDialogData {
  photo: Photo;
}

export interface EditTagsDialogData {
  tags: string[];
}

export interface EditTagsDialogResult {
  addedTags: string[];
  removedTags: string[];
}

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection,
  Download,
  EditTags,
  NewTag,
  ManageTags,
  SwitchPhotoControl
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit, AfterViewInit, OnDestroy, ActionProvider, AreaSelectionHandler {

  @ViewChild('scrollbar')
  scrollbarRef: NgScrollbar;

  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  @Select(PhotoState.getAvailablePhotos)
  allPhotosCount$: Observable<number>;
  allPhotosCount: number;

  @Select(PhotoState.getLoadedPhotos)
  loadedPhotos$: Observable<number>;
  loadedPhotos: number;

  @Select(PhotoState.getFilteredPhotos)
  photos$: Observable<Photo[]>;
  photos: Photo[];

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;
  currentPhoto: Photo;

  @Select(PhotoState.getSelectedPhotos)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  @Select(PhotoState.getDownloads)  // todo look for pipe to remove field downloads
  downloads$: Observable<Photo[]>;
  downloads: Photo[];

  showFilter = true;
  absoluteHeight = 0;
  private isRequesting: boolean;
  private resizeObserver: ResizeObserver;

  switchControl = false;

  private areaSelection: AreaSelection;
  actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
    {name: ActionTypes.Download, icon: 'download', tooltip: 'download', handler: this},
    {name: ActionTypes.EditTags, icon: 'edit', tooltip: 'edit tags', handler: this},
    {name: ActionTypes.NewTag, icon: 'playlist_add', tooltip: 'new tag', handler: this},
    {name: ActionTypes.ManageTags, icon: 'list', tooltip: 'manage tags', handler: this},
    {name: ActionTypes.SwitchPhotoControl, icon: 'autorenew', tooltip: 'switch control', handler: this},
  ]
  private subscription: Subscription;

  constructor(private actionBarService: ActionBarService,
              private photoService: PhotoService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
    this.subscription = this.selection$.subscribe(res => this.selection = res);
    this.subscription = this.downloads$.subscribe(res => this.downloads = res);
    this.subscription = this.loadedPhotos$.subscribe(res => this.loadedPhotos = res);
    this.subscription.add(this.currentPhoto$.subscribe(res => this.currentPhoto = res));
    this.subscription.add(this.isAuthenticated$.subscribe(res => this.isAuthenticated = res));
    this.subscription.add(this.allPhotosCount$.subscribe(count => this.allPhotosCount = count));
    this.subscription.add(
      this.photos$.subscribe(res => {
        this.photos = res;
        this.isRequesting = false;
      }));
    this.initializeSelectionArea();
  }

  ngAfterViewInit(): void {
    this.observeScrollContent();
    this.scrollbarRef.verticalScrolled.pipe(
      tap((e: Event) => {
        this.requestNextPhotos(e.target as Element);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.actionBarService.removeActions();
  }

  setCurrent(photo: Photo): void {
    this.store.dispatch(new photoAction.SetCurrentPhoto(photo))
  }

  observeScrollContent(): void {
    const element = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content');
    this.resizeObserver = new ResizeObserver(res => {
      this.absoluteHeight = res[0].contentRect.height;
      // console.log('GalleryExplorerComponent observeScrollContent: ', this.absoluteHeight)
    });
    this.resizeObserver.observe(element!);
  }

  requestNextPhotos(element: Element): void {
    const currentHeight = element.clientHeight + element.scrollTop /* + element.scrollTop*/;
    // console.log('GalleryExplorerComponent requestNextPhotos: ', currentHeight, this.absoluteHeight)
    if (currentHeight + 180 > this.absoluteHeight && !this.isRequesting) {
      this.isRequesting = true;
      this.store.dispatch(new photoAction.LoadPhotos(60));
    }
  }

  onAction(action: Action): void {
    switch (action.name) {
      case ActionTypes.SelectAll:
        this.store.dispatch(new photoAction.SelectAllPhotos());
        break;
      case ActionTypes.DeselectAll:
        this.store.dispatch(new photoAction.DeselectAllPhotos());
        break;
      case ActionTypes.ToggleSelection:
        this.store.dispatch(new photoAction.ToggleAllDownload());
        break;
      case ActionTypes.Download:
        this.downloadPhotos();
        break;
      case ActionTypes.EditTags:
        // this.editTags();
        break;
      case ActionTypes.NewTag:
        this.openNewTagDialog();
        break;
      case ActionTypes.ManageTags:
        this.openEditTagDialog();
        break;
      case ActionTypes.SwitchPhotoControl:
        this.switchControl = !this.switchControl;
        break;
    }
  }

  onSelectForEdit($event: Photo): void {
    this.editTags([$event]);
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new photoAction.TogglePhotoDownload($event));
  }

  onSelectForPreview($event: Photo): void {
    this.setCurrent($event);
    void this.router.navigate(['gallery/slideshow']);
  }

  onSelectForDelete($event: Photo): void {
    this.openDeletePhotoDialog($event);
  }

  onClickClearFilter(): void {
    this.store.dispatch(new ClearFilter())
  }

  isDownload(photo: Photo): boolean {
    return this.downloads.includes(photo);
  }

  private initializeSelectionArea(): void {
    this.areaSelection = new AreaSelection(this);
  }

  onSelectionFinish(photoFileNames: string[]): void {
    const photos: Photo[] = [];
    for (const fileName of photoFileNames) {
      const photo = this.photos.find(img => img.fileName == fileName);
      if (photo) {
        photos.push(photo);
      } else {
        console.log('GalleryExplorerComponent err why cant find the id?: ', fileName)
      }
    }
    this.store.dispatch(new photoAction.SelectManyPhotos(photos));
  }

  private downloadPhotos(): void {
    this.photoService.download(this.downloads)
      .subscribe((blob) => {
        saveAs(blob, 'photos.zip')
        this.store.dispatch(new photoAction.DeselectAllDownloads())
      })
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
    const dialogRef = this.dialog.open(GalleryEditImageTagsComponent, {
      data: {tags: this.computeAvailableTagsOfPhotos(photos)},
      width: '800px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateTagsOfSelectedPhotos(result);
    });
  }

  private openNewTagDialog(): void {
    this.dialog.open(GalleryNewTagCategoryComponent, {
      // minWidth: '600px',
      width: '500px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  private openEditTagDialog(): void {
    this.dialog.open(GalleryEditTagsComponent, {
      // minWidth: '600px',
      width: '800px',
      // minHeight: '400px',
      // maxHeight: '600px',
      restoreFocus: false,
      autoFocus: false
    });
  }

  private computeAvailableTagsOfPhotos(photos: Photo[]): string[] {
    const res: string[] = [];
    for (const pic of photos) {
      res.push(...pic.tags);
    }
    return Array.from(new Set(res));
  }

  private updateTagsOfSelectedPhotos(res: EditTagsDialogResult): void {
    if (!res) {
      return;
    }
    let tags: string[] = [];
    for (const photo of this.selection) {
      tags = photo.tags.filter(x => !res.removedTags.includes(x));
      tags = tags.filter(x => !res.addedTags.includes(x))
        .concat(res.addedTags.filter(x => !tags.includes(x)));
      this.store.dispatch(new photoAction.SetTagsOfPhoto(photo, tags));
    }
  }
}
