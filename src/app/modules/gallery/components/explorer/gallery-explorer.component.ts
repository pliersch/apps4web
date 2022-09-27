import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { saveAs } from 'file-saver';
import {
  DeletePhotoAction, DeselectAllPhotosAction, LoadPhotosAction,
  SelectAllPhotosAction, SelectManyPhotosAction, SetCurrentPhotoAction,
  SetTagsOfPicture, TogglePhotoDownloadAction, TogglePhotosDownloadAction
} from "@gallery/store/photos/photo.actions";
import { AreaSelection, AreaSelectionHandler } from "@gallery/components/explorer/area-selection";
import { GalleryEditImageTagsComponent }
  from "@gallery/components/explorer/edit-image-tags/gallery-edit-image-tags.component";
import { MatDialog } from "@angular/material/dialog";
import { PhotoService } from "@gallery/services/photo.service";
import { NgScrollbar } from "ngx-scrollbar";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthState } from "@modules/account/store/auth.state";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { ActionBarService } from "@modules/action-bar/action-bar.service";

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

  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  @Select(PhotoState.getAllPhotosCount)
  allPhotosCount$: Observable<number>;
  allPhotosCount: number;

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;
  photos: Photo[];

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;
  currentPhoto: Photo;

  @Select(PhotoState.getSelectedPictures)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  showFilter = true;
  absoluteHeight = 0;
  private isRequesting: boolean;
  private resizeObserver: ResizeObserver;

  private areaSelection: AreaSelection;
  actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
    {name: ActionTypes.Download, icon: 'download', tooltip: 'download', handler: this},
    {name: ActionTypes.EditTags, icon: 'edit', tooltip: 'edit tags', handler: this},
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
    this.subscription.add(this.currentPhoto$.subscribe(res => this.currentPhoto = res));
    this.subscription.add(this.isAuthenticated$.subscribe(res => this.isAuthenticated = res));
    this.subscription.add(this.allPhotosCount$.subscribe(count => this.allPhotosCount = count));
    this.subscription.add(
      this.photos$.subscribe(res => {
        this.photos = res;
        this.isRequesting = false;
      }));
    this.store.dispatch(new LoadPhotosAction(60));
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

  observeScrollContent(): void {
    const element = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content');
    this.resizeObserver = new ResizeObserver(res => {
      this.absoluteHeight = res[0].contentRect.height;
    });
    this.resizeObserver.observe(element!);
  }

  setCurrent(photo: Photo): void {
    this.store.dispatch(new SetCurrentPhotoAction(photo))
    this.currentPhoto = photo;
  }

  requestNextPhotos(element: Element): void {
    const currentHeight = element.clientHeight + element.scrollTop /* + element.scrollTop*/;
    if (currentHeight + 180 > this.absoluteHeight && !this.isRequesting) {
      this.isRequesting = true;
      this.store.dispatch(new LoadPhotosAction(60));
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

  onSelectForEdit($event: Photo): void {
    // todo: open edit component
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new TogglePhotoDownloadAction($event));
  }

  onSelectForPreview($event: Photo): void {
    this.setCurrent($event);
    void this.router.navigate(['gallery/slideshow']);
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
    const photos: Photo[] = [];
    for (const fileName of photoFileNames) {
      const photo = this.photos.find(img => img.fileName == fileName);
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
      .subscribe(blob => saveAs(blob, 'pictures.zip'));
  }

  private editTags(): void {
    const dialogRef = this.dialog.open(GalleryEditImageTagsComponent, {
      data: {tags: this.computeAvailableTagsOfPictures()},
      width: '800px',
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
    const res: string[] = [];
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
