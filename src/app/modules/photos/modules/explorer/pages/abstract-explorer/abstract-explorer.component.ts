import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { ComponentType } from "@angular/cdk/overlay";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SetCheckedInstruction } from "@app/core/stores/app/app.actions";
import { AppState } from "@app/core/stores/app/app.state";
import { Action } from "@modules/action-bar/actions";
import { Role } from "@modules/admin/modules/user/store/role";
import { PhotoService } from "@modules/photos/services/photo.service";
import * as photoAction from "@modules/photos/store/photos/photo.actions";
import { AddTagFilter, RemoveTagFilter, SetRatingFilter } from "@modules/photos/store/photos/photo.actions";
import { Photo, PhotoCountByTag } from "@modules/photos/store/photos/photo.model";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Tag, TagGroup } from "@modules/photos/store/tags/tag.model";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { Observable, Subscription, take } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-abstract-explorer',
  templateUrl: './abstract-explorer.component.html',
  styleUrls: ['./abstract-explorer.component.scss']
})
export abstract class AbstractExplorerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollbar')
  scrollbar: NgScrollbar;

  @Select(AppState.getCheckedInstructions)
  checkedInstructions$: Observable<string[]>;
  checkedInstructions: string[];

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

  @Select(PhotoState.getPhotoCountByTags) // for tagFilterComponent
  photoCounts$: Observable<PhotoCountByTag[]>;
  photoCounts: PhotoCountByTag[];

  protected instructionDialogComponent: ComponentType<any>;
  protected subscription: Subscription;
  protected absoluteHeight = 0;
  protected isRequesting: boolean;
  protected resizeObserver: ResizeObserver;
  protected availableActions: Action[] = [];
  protected allowedActions: Action[] = [];
  private content: Element;
  private viewport: Element;

  protected constructor(
    public photoService: PhotoService,
    public router: Router,
    public dialog: MatDialog,
    public store: Store,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
      this.computeAllowedActions(user.role);
    });
    this.subscription.add(this.selection$.subscribe(res => this.selection = res));
    this.subscription.add(this.selectedDownloads$.subscribe(res => this.selectedDownloads = res));
    this.subscription.add(this.finalDownloads$.subscribe(res => this.finalDownloads = res));
    this.subscription.add(this.loadedPhotos$.subscribe(res => this.loadedPhotos = res));
    this.subscription.add(this.currentIndex$.subscribe(res => this.currentIndex = res));
    this.subscription.add(this.currentPhoto$.subscribe(res => this.currentPhoto = res));
    this.subscription.add(this.checkedInstructions$.subscribe(res => this.checkedInstructions = res));
    this.subscription.add(this.availablePhotos$.subscribe(count => this.availablePhotos = count));
    this.subscription.add(this.currentRating$.subscribe(res => this.currentRating = res));
    this.subscription.add(this.tagGroups$.subscribe(res => this.tagGroups = res));
    this.subscription.add(this.activeTags$.subscribe(res => this.activeTags = res));
    this.subscription.add(this.photoCounts$.subscribe(res => this.photoCounts = res));
    this.subscription.add(
      this.photos$.subscribe(res => {
        this.photos = res;
        this.isRequesting = false;
      }));
  }

  ngAfterViewInit(): void {
    this.content = this.scrollbar.nativeElement.querySelector('.ng-scroll-content')!;
    this.absoluteHeight = this.content.clientHeight + this.content.scrollTop;
    this.viewport = this.scrollbar.nativeElement.querySelector('.ng-scroll-viewport')!;
    this.observeScrollContent();
    this.scrollbar.verticalScrolled.pipe(
      tap((e: Event) => {
        this.requestNextPhotos(e.target as Element);
      })
    ).subscribe();
    this.requestNextPhotos(this.viewport);
    this.currentIndex$.pipe(take(1)).subscribe(res => {
      this.currentIndex = res;
      this.scrollToActiveItem();
    });
    if (!this.checkedInstructions.includes(this.constructor.name)) {
      this.showInstructionDialog();
    }
  }

  private computeAllowedActions(role: Role): void {
    this.allowedActions = []
    for (const action of this.availableActions) {
      if (!action.role) { // for every user
        this.allowedActions.push(action);
      } else if (action.role && action.role <= role) {
        this.allowedActions.push(action);
      }
    }
  }

  abstract onAction(action: Action): void;

  protected scrollToActiveItem(): void {
    throw new Error('you must impl "scrollToActiveItem"')
  }

  showInstructionDialog(): void {
    const dialogRef = this.dialog.open(this.instructionDialogComponent, {
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new SetCheckedInstruction(this.constructor.name));
      }
    });
  }

  observeScrollContent(): void {
    this.resizeObserver = new ResizeObserver(res => {
      this.absoluteHeight = res[0].contentRect.height;
      this.requestNextPhotos(this.viewport);
    });
    this.resizeObserver.observe(this.content);
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
      this.store.dispatch(new photoAction.LoadPhotos());
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
    this.resizeObserver.unobserve(this.content)
    // this.actionBarService.removeActions();
  }

}
