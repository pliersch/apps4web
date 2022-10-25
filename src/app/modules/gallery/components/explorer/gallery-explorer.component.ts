import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { PhotoState } from "@gallery/store/photos/photo.state";
import { saveAs } from 'file-saver';
import * as photoAction from "@gallery/store/photos/photo.actions";
import { MatDialog } from "@angular/material/dialog";
import { PhotoService } from "@gallery/services/photo.service";
import { NgScrollbar } from "ngx-scrollbar";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthState } from "@modules/google-signin/store/auth.state";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { GALLERY_CONSTANTS } from "@gallery/const";


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
export class GalleryExplorerComponent implements OnInit, AfterViewInit, OnDestroy, ActionProvider {

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

  @Select(PhotoState.getEditPhotos)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  @Select(PhotoState.getDownloads)  // todo look for pipe to remove field downloads
  downloads$: Observable<Photo[]>;
  downloads: Photo[];

  showFilter = true;
  absoluteHeight = 0;
  private isRequesting: boolean;
  private resizeObserver: ResizeObserver;

  private viewportHeight: number;

  actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.Add, icon: 'add', tooltip: 'add', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
    {name: ActionTypes.Download, icon: 'download', tooltip: 'download', handler: this},
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
  }

  ngAfterViewInit(): void {
    this.observeScrollContent();
    this.scrollbarRef.verticalScrolled.pipe(
      tap((e: Event) => {
        this.requestNextPhotos(e.target as Element);
      })
    ).subscribe();
    const element = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content');
    this.absoluteHeight = element!.clientHeight + element!.scrollTop;
    const element1 = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-viewport');
    this.requestNextPhotos(element1!);
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
    });
    this.resizeObserver.observe(element!);
  }

  requestNextPhotos(element: Element): void {
    const currentHeight = element.clientHeight + element.scrollTop;
    if (currentHeight + 180 > this.absoluteHeight && !this.isRequesting) {
      this.isRequesting = true;
      this.store.dispatch(new photoAction.LoadPhotos(GALLERY_CONSTANTS.PHOTO_LOAD_COUNT));
    }
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
