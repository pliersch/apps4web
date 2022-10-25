import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppInjectorService } from "@app/services/app-injector.service";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { PhotoService } from "@gallery/services/photo.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@modules/google-signin/store/auth.state";
import { Observable, Subscription } from "rxjs";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Photo } from "@gallery/store/photos/photo.model";
import { NgScrollbar } from "ngx-scrollbar";
import { tap } from "rxjs/operators";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { GALLERY_CONSTANTS } from "@gallery/const";


@Component({
  selector: 'app-abstract-explorer',
  templateUrl: './abstract-explorer.component.html',
  styleUrls: ['./abstract-explorer.component.scss']
})
export class AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

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

  @Select(PhotoState.getDownloads)  // todo look for pipe to remove field downloads
  downloads$: Observable<Photo[]>;
  downloads: Photo[];

  @Select(PhotoState.getEditPhotos)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  protected subscription: Subscription;
  protected actionBarService: ActionBarService
  protected photoService: PhotoService
  protected router: Router
  public dialog: MatDialog
  protected store: Store

  protected absoluteHeight = 0;
  protected isRequesting: boolean;
  protected resizeObserver: ResizeObserver;


  protected constructor() {
    const injector = AppInjectorService.getInjector();
    this.actionBarService = injector.get(ActionBarService);
    this.photoService = injector.get(PhotoService);
    this.router = injector.get(Router);
    this.dialog = injector.get(MatDialog);
    this.store = injector.get(Store);
  }

  ngOnInit(): void {
    console.log('AbstractExplorerComponent ngOnInit: ',)
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

  ngOnDestroy(): void {
    console.log('AbstractExplorerComponent ngOnDestroy: ',)
  }

}
