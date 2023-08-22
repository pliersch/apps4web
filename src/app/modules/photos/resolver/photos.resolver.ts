import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Resolve, Router } from "@angular/router";
import { PhotosSseService } from "@modules/photos/services/photos-sse.service";
import { LoadMetaData, LoadPhotos } from "@modules/photos/store/photos/photo.actions";
import { PhotoSseData } from "@modules/photos/store/photos/photo.model";
import { LoadTags, SetNewTagsAvailable } from "@modules/photos/store/tags/tag.action";
import { Store } from "@ngxs/store";
import { concatMap, Observable, of, Subscription } from "rxjs";

@Injectable()
export class PhotosResolver implements Resolve<boolean> {

  private initialized = false;
  private photosAdded = false;
  private tagsAdded = false;
  // todo not implemented
  private photosChanged = false;
  // todo not implemented
  private tagsChanged = false;

  constructor(private store: Store,
              private photosSseService: PhotosSseService,
              private router: Router) {
    this.initListener()
  }

  initListener(): void {
    // error in loop because type != string
    this.photosSseService.on("photo_added", (data) => this.onPhotosAdded(data));
    this.photosSseService.on("photo_changed", (data) => this.onPhotosChanged(data));
    this.photosSseService.on("tag_added", (data) => this.onTagsAdded(data));
    this.photosSseService.on("tag_changed", (data) => this.onTagsChanged(data));
  }

  resolve(): Observable<boolean> {
    if (!this.initialized) {
      this.initStore();
      this.initialized = true;
    }
    this.handleChanges()
    return of(true);
  }

  private initStore(): void {
    of(Subscription.EMPTY).pipe( // useless but more readable ;)
      concatMap(() => this.store.dispatch(new LoadMetaData())),
      concatMap(() => this.store.dispatch(new LoadTags())),
      concatMap(() => this.store.dispatch(new LoadPhotos())))
      .subscribe();
  }

  private onPhotosAdded(data: PhotoSseData): void {
    console.log('PhotosResolver onPhotosAdded: ',)
    if (this.isFromOtherUser(data.userId)) {
      if (this.isUrlOpen()) {
        this.store.dispatch(new LoadMetaData());
        console.log('PhotosResolver pop up?')
      } else {
        this.photosAdded = true;
      }
    }
  }

  private onPhotosChanged(data: PhotoSseData): void {
    if (this.isFromOtherUser(data.userId) && this.isUrlOpen()) {
      this.photosChanged = true;
    }
  }

  private onTagsAdded(data: PhotoSseData): void {
    if (this.isFromOtherUser(data.userId)) {
      if (this.isUrlOpen()) {
        this.store.dispatch(new SetNewTagsAvailable());
      } else {
        this.tagsAdded = true;
      }
    }
  }

  private onTagsChanged(data: PhotoSseData): void {
    if (this.isFromOtherUser(data.userId) && this.isUrlOpen()) {
      this.tagsChanged = true;
    }
  }

  // todo
  // https://trello.com/c/nZOOBVNo/84-sse-photos-ausimplementieren
  private handleChanges(): void {
    console.log('PhotosResolver handleChanges: 1',)
    if (this.photosAdded) {
      console.log('PhotosResolver handleChanges: 2',)
      this.store.dispatch(new LoadMetaData());
      this.photosAdded = false;
    }
    if (this.photosChanged) {
      // this.photosChanged = false;
    }
    if (this.tagsAdded) {
      this.store.dispatch(new SetNewTagsAvailable());
      this.tagsAdded = false;
    }
    if (this.tagsChanged) {
      // this.tagsChanged = false;
    }
  }

  private isUrlOpen(): boolean {
    return this.router.url.includes('photos');
  }

  private isFromOtherUser(userId: string): boolean {
    return userId != this.store.selectSnapshot(AccountState.getUser)!.id;
  }
}
