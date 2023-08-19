import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
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

  constructor(private store: Store,
              private serverSentService: ServerSentService) {
    this.serverSentService.addListener(PushMessageEvent.VISIT_ADDED, this);
  }

  resolve(): Observable<boolean> {
    if (this.store.selectSnapshot(ProtocolState.getVisits).length === 0) {
      return this.store.dispatch(new LoadVisits())
    }

    return of(true);
  }

  onServerPushMessage(event: PushMessageEvent<Visit>): void {
    this.store.dispatch(new AddVisit(event.payload!))
  }
}
