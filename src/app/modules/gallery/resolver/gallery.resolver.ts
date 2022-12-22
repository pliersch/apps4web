import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { concatMap, Observable, of, Subscription } from "rxjs";
import { Store } from "@ngxs/store";
import { LoadMetaData, LoadPhotos } from "@gallery/store/photos/photo.actions";
import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { LoadTags, SetNewTagsAvailable } from "@gallery/store/tags/tag.action";
import { GALLERY_CONSTANTS } from "@gallery/const";

@Injectable()
export class GalleryResolver implements PushMessageListener, Resolve<Subscription> {

  private initialized = false;
  private photosAdded = false
  private photosChanged = false
  private tagsChanged = false

  constructor(private store: Store,
              private pushService: ServerSentService) {
    this.pushService.addListener(PushMessageEvent.TAGS_CHANGED, this);
    this.pushService.addListener(PushMessageEvent.PHOTOS_ADDED, this);
    this.pushService.addListener(PushMessageEvent.PHOTOS_CHANGED, this);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
    let observable: Observable<Subscription> = of(Subscription.EMPTY);
    if (!this.initialized) {
      observable = this.initStore();
      this.initialized = true;
    }
    this.handleChanges()
    return observable;
  }

  private initStore(): Observable<Subscription> {
    return of(Subscription.EMPTY).pipe( // yes, I know. but more readable ;)
      concatMap(() => this.store.dispatch(new LoadMetaData())),
      concatMap(() => this.store.dispatch(new LoadTags())),
      concatMap(() => this.store.dispatch(new LoadPhotos(GALLERY_CONSTANTS.PHOTO_LOAD_COUNT))));
  }

  onServerPushMessage(event: PushMessageEvent): void {
    switch (event.type) {
      case PushMessageEvent.PHOTOS_ADDED:
        this.photosAdded = true;
        break;
      case PushMessageEvent.PHOTOS_CHANGED:
        this.photosChanged = true;
        break;
      case PushMessageEvent.TAGS_CHANGED:
        this.tagsChanged = true;
        break;
    }
  }

  private handleChanges(): void {
    if (this.photosAdded) {
      this.store.dispatch(new LoadMetaData());
      this.photosAdded = false;
    }
    if (this.tagsChanged) {
      this.store.dispatch(new SetNewTagsAvailable());
      this.tagsChanged = false;
    }
  }
}
