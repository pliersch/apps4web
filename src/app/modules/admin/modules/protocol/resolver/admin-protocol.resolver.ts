import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AdminSseService } from "@modules/admin/modules/protocol/service/admin-sse.service";
import { AddVisit, LoadVisits } from "@modules/admin/modules/protocol/store/protocol.actions";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProtocolResolver implements Resolve<boolean> {

  newVisitExist = true;

  constructor(private store: Store,
              private adminSseService: AdminSseService,
              private router: Router) {
    this.adminSseService.on('visit_added', (visit) => this.onServerSendVisit(visit));
  }

  resolve(): Observable<boolean> {
    const noVisits = this.store.selectSnapshot(ProtocolState.getVisits).length === 0;
    // todo use 'handleChanges' like chat- and photo-resolver
    if (noVisits || this.newVisitExist) {
      this.store.dispatch(new LoadVisits())
    }
    return of(true);
  }

  private onServerSendVisit(visit: Visit): void {
    if (this.isVisitOpen() && this.isFromOtherUser(visit)) {
      this.store.dispatch(new AddVisit(visit))
    } else {
      this.newVisitExist = true;
    }
  }

  private isVisitOpen(): boolean {
    return this.router.url.includes('/admin/visits');
  }

  private isFromOtherUser(event: Visit): boolean {
    return event.email != this.store.selectSnapshot(AccountState.getUser)?.email;
  }
}
