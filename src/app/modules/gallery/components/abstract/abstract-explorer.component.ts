import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppInjectorService } from "@app/services/app-injector.service";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { PhotoService } from "@gallery/services/photo.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@modules/google-signin/store/auth.state";
import { Observable } from "rxjs";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Photo } from "@gallery/store/photos/photo.model";
import { NgScrollbar } from "ngx-scrollbar";


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

  protected actionBarService: ActionBarService
  protected photoService: PhotoService
  protected router: Router
  public dialog: MatDialog
  protected store: Store

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
    console.log('AbstractExplorerComponent ngAfterViewInit: ',)
  }

  ngOnDestroy(): void {
    console.log('AbstractExplorerComponent ngOnDestroy: ',)
  }

}
