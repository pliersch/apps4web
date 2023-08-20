import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { AddVisit, LoadVisits } from "@modules/admin/modules/protocol/store/protocol.actions";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProtocolResolver implements Resolve<boolean>, PushMessageListener {

  newVisitExist = true;

  constructor(private store: Store,
              private serverSentService: ServerSentService,
              private router: Router) {
    this.serverSentService.addListener(PushMessageEvent.VISIT_ADDED, this);
  }

  resolve(): Observable<boolean> {
    const noVisits = this.store.selectSnapshot(ProtocolState.getVisits).length === 0;
    // todo use 'handleChanges' like chat- and photo-resolver
    if (noVisits || this.newVisitExist) {
      this.store.dispatch(new LoadVisits())
    }
    return of(true);
  }

  onServerPushMessage(event: PushMessageEvent<Visit>): void {
    if (this.isAdminOpen() && this.isFromOtherUser(event)) {
      this.store.dispatch(new AddVisit(event.payload!))
    } else {
      this.newVisitExist = true;
    }
  }

  private isAdminOpen(): boolean {
    return this.router.url.includes('/admin/visits');
  }

  private isFromOtherUser(event: PushMessageEvent<Visit>): boolean {
    return event.payload?.email != this.store.selectSnapshot(AccountState.getUser)?.email;
  }
}
