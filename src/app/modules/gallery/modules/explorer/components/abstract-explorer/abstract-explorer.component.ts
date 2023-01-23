import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GALLERY_CONSTANTS } from "@gallery/const";
import { PhotoService } from "@gallery/services/photo.service";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { AddTagFilter, RemoveTagFilter, SetRatingFilter } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Tag, TagGroup } from "@gallery/store/tags/tag.model";
import { TagState } from "@gallery/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-abstract-explorer',
  templateUrl: './abstract-explorer.component.html',
  styleUrls: ['./abstract-explorer.component.scss']
})
export class AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollbar')
  scrollbarRef: NgScrollbar;

  @Select(AccountState.isAuthenticated)
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

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  @Select(PhotoState.getSelectedDownloads)
  selectedDownloads$: Observable<Photo[]>;
  selectedDownloads: Photo[];

  @Select(PhotoState.getFinalDownloads)
  finalDownloads$: Observable<Photo[]>;
  finalDownloads: Photo[];

  @Select(PhotoState.getEditPhotos)
  selection$: Observable<Photo[]>;
  selection: Photo[];

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;

  @Select(PhotoState.getFilterRating)
  currentRating$: Observable<number>;
  currentRating: number;

  @Select(TagState.getTagGroups) // for tagFilterComponent
  tagGroups$: Observable<TagGroup[]>;
  tagGroups: TagGroup[];

  @Select(PhotoState.getActiveTags) // for tagFilterComponent
  activeTags$: Observable<Tag[]>;
  activeTags: Tag[];

  protected subscription: Subscription;
  protected absoluteHeight = 0;
  protected isRequesting: boolean;
  protected resizeObserver: ResizeObserver;

  constructor(
    public photoService: PhotoService,
    public router: Router,
    public dialog: MatDialog,
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => this.user = res);
    this.subscription.add(this.selection$.subscribe(res => this.selection = res));
    this.subscription.add(this.selectedDownloads$.subscribe(res => this.selectedDownloads = res));
    this.subscription.add(this.finalDownloads$.subscribe(res => this.finalDownloads = res));
    this.subscription.add(this.loadedPhotos$.subscribe(res => this.loadedPhotos = res));
    this.subscription.add(this.currentIndex$.subscribe(res => this.currentIndex = res));
    this.subscription.add(this.currentPhoto$.subscribe(res => this.currentPhoto = res));
    this.subscription.add(this.isAuthenticated$.subscribe(res => this.isAuthenticated = res));
    this.subscription.add(this.availablePhotos$.subscribe(count => this.availablePhotos = count));
    this.subscription.add(this.currentRating$.subscribe(res => this.currentRating = res));
    this.subscription.add(this.tagGroups$.subscribe(res => this.tagGroups = res));
    this.subscription.add(this.activeTags$.subscribe(res => this.activeTags = res));
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
    if (this.isRequesting) {
      return;
    }
    const currentHeight = element.clientHeight + element.scrollTop;
    if (currentHeight + 180 > this.absoluteHeight) {
      this.isRequesting = true;
      this.store.dispatch(new photoAction.LoadPhotos(GALLERY_CONSTANTS.PHOTO_LOAD_COUNT));
    }
  }

  setCurrent(photo: Photo): void {
    this.store.dispatch(new photoAction.SetCurrentPhoto(photo))
  }

  handleRatingChange($event: number): void {
    this.store.dispatch(new SetRatingFilter($event));
  }

  handleTagFilterChanged($event: Tag, added: boolean): void {
    if (added) {
      this.store.dispatch(new AddTagFilter($event));
    } else {
      this.store.dispatch(new RemoveTagFilter($event));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.actionBarService.removeActions();
  }

}
