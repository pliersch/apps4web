import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppInjectorService } from "@app/common/services/app-injector.service";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { PhotoService } from "@gallery/services/photo.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { SigninState } from "@modules/google-signin/store/signin.state";
import { Observable, Subscription } from "rxjs";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Photo } from "@gallery/store/photos/photo.model";
import { NgScrollbar } from "ngx-scrollbar";
import { tap } from "rxjs/operators";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { GALLERY_CONSTANTS } from "@gallery/const";
import { Action } from "@modules/action-bar/actions";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { User } from "@modules/admin/modules/user/store/user";


@Component({
  selector: 'app-abstract-explorer',
  templateUrl: './abstract-explorer.component.html',
  styleUrls: ['./abstract-explorer.component.scss']
})
export class AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollbar')
  scrollbarRef: NgScrollbar;

  @Select(SigninState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  @Select(PhotoState.getAvailablePhotos)
  availablePhotos$: Observable<number>;
  availablePhotos: number;

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

  @Select(UserState.getUser)
  user$: Observable<User>;
  user: User;

  protected subscription: Subscription;
  protected actionBarService: ActionBarService
  protected photoService: PhotoService
  protected router: Router
  public dialog: MatDialog
  protected store: Store
  protected actions: Action[]

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
    this.actionBarService.setActions(this.actions);
    this.subscription = this.user$.subscribe(res => this.user = res);
    this.subscription.add(this.selection$.subscribe(res => this.selection = res));
    this.subscription.add(this.downloads$.subscribe(res => this.downloads = res));
    this.subscription.add(this.loadedPhotos$.subscribe(res => this.loadedPhotos = res));
    this.subscription.add(this.currentPhoto$.subscribe(res => this.currentPhoto = res));
    this.subscription.add(this.isAuthenticated$.subscribe(res => this.isAuthenticated = res));
    this.subscription.add(this.availablePhotos$.subscribe(count => this.availablePhotos = count));
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

  observeScrollContent(): void {
    const element = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content');
    this.resizeObserver = new ResizeObserver(res => {
      this.absoluteHeight = res[0].contentRect.height;
    });
    this.resizeObserver.observe(element!);
  }

  requestNextPhotos(element: Element): void {
    if (this.availablePhotos === this.loadedPhotos) {
      return;
    }
    const currentHeight = element.clientHeight + element.scrollTop;
    if (currentHeight + 180 > this.absoluteHeight && !this.isRequesting) {
      this.isRequesting = true;
      this.store.dispatch(new photoAction.LoadPhotos(GALLERY_CONSTANTS.PHOTO_LOAD_COUNT));
    }
  }

  setCurrent(photo: Photo): void {
    this.store.dispatch(new photoAction.SetCurrentPhoto(photo))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.actionBarService.removeActions();
  }

}
