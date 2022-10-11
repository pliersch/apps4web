import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store } from "@ngxs/store";
import { LoadMetaData } from "@gallery/store/photos/photo.actions";
import { PushMessageEvent, PushMessageListener, ServerPushService } from "@app/common/services/server-push.service";

@Injectable({
  providedIn: 'root'
})
export class GalleryResolver implements PushMessageListener, Resolve<any> {

  private metaChanged = true;

  constructor(private store: Store,
              private pushService: ServerPushService) {
    this.pushService.addListener(PushMessageEvent.META_CHANGED, this)
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (!this.metaChanged) {
      return of(0);
    }
    this.metaChanged = false;
    return this.store.dispatch(new LoadMetaData())
  }

  onServerPushMessage(event: PushMessageEvent): void {
    console.log('GalleryResolver onServerPushMessage: ',)
    this.metaChanged = true;
  }
}
