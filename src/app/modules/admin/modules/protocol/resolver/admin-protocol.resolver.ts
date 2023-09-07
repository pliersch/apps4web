import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSseService } from "@modules/admin/modules/protocol/service/admin-sse.service";
import { AddVisit, LoadVisits } from "@modules/admin/modules/protocol/store/protocol.actions";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProtocolResolver {

  private initialized = false;
  newVisitExist = false;

  constructor(private store: Store,
              private adminSseService: AdminSseService,
              private router: Router) {
    this.adminSseService.on('visit_added', (visit) => this.onVisitAdded(visit));
  }

  resolve(): Observable<boolean> {
    if (!this.initialized) {
      this.initialize();
    } else {
      this.handleChanges()
    }
    return of(true);
  }

  private initialize(): void {
    this.store.dispatch(new LoadVisits());
    this.initialized = true;
  }

  private handleChanges(): void {
    if (this.newVisitExist) {
      console.log('AdminProtocolResolver handleChanges: ',)
      this.store.dispatch(new LoadVisits());
      this.newVisitExist = false;
    }
  }

  private onVisitAdded(visit: Visit): void {
    if (this.isUrlOpen() && this.isFromOtherUser(visit.userId)) {
      this.store.dispatch(new AddVisit(visit))
    } else {
      this.newVisitExist = true;
    }
  }

  private isUrlOpen(): boolean {
    return this.router.url.includes('/admin/visits');
  }

  private isFromOtherUser(userId: string): boolean {
    return userId != this.store.selectSnapshot(AccountState.getUser)!.id;
  }
}
