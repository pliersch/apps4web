import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { Store } from "@ngxs/store";
import { LoadMetaData, LoadPhotos } from "@gallery/store/photos/photo.actions";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { LoadTags, SetNewTagsAvailable } from "@gallery/store/tags/tag.action";
import { TagState } from "@gallery/store/tags/tag.state";

@Injectable({
  providedIn: 'root'
})
export class GalleryResolver implements PushMessageListener, Resolve<any> {

  private photosAdded = false
  private photosChanged = false
  private tagsChanged = false

  constructor(private store: Store,
              private pushService: ServerSentService) {
    this.pushService.addListener(PushMessageEvent.TAGS_CHANGED, this);
    this.pushService.addListener(PushMessageEvent.PHOTOS_ADDED, this);
    this.pushService.addListener(PushMessageEvent.PHOTOS_CHANGED, this);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let observable = of(Subscription.EMPTY);
    if (this.store.selectSnapshot(TagState.getTags).length === 0) {
      observable = this.store.dispatch(new LoadTags());
    }
    if (this.store.selectSnapshot(PhotoState.getPhotos).length === 0) {
      observable = this.store.dispatch(new LoadMetaData())
    }
    this.handleChanges()
    return observable;
  }

  onServerPushMessage(event: PushMessageEvent): void {
    console.log('GalleryResolver onServerPushMessage: ', event.type)
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
