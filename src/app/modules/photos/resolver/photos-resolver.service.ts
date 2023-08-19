import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";

import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { LoadMetaData, LoadPhotos } from "@modules/photos/store/photos/photo.actions";
import { LoadTags, SetNewTagsAvailable } from "@modules/photos/store/tags/tag.action";
import { Store } from "@ngxs/store";
import { concatMap, Observable, of, Subscription } from "rxjs";

@Injectable()
export class PhotosResolver implements PushMessageListener, Resolve<boolean> {

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

  resolve(): Observable<boolean> {
    if (!this.initialized) {
      this.initStore();
      this.initialized = true;
    }
    this.handleChanges()
    return of(true);
  }

  private initStore(): void {
    of(Subscription.EMPTY).pipe( // yes, I know. but more readable ;)
      concatMap(() => this.store.dispatch(new LoadMetaData())),
      concatMap(() => this.store.dispatch(new LoadTags())),
      concatMap(() => this.store.dispatch(new LoadPhotos())))
      .subscribe();
  }

  // current changes will handle when re-open photos
  onServerPushMessage(event: PushMessageEvent<any>): void {
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
