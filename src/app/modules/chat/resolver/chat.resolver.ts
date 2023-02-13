import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { LoadChat } from "@modules/chat/store/chat.actions";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatResolver implements PushMessageListener, Resolve<boolean> {

  private initialized = false;
  private messagesAdded = false;

  constructor(private store: Store,
              private pushService: ServerSentService,
              private router: Router) {
    console.log('ChatResolver constructor: ',)
    this.pushService.addListener(PushMessageEvent.MESSAGE_ADDED, this);
  }

  resolve(): Observable<boolean> {
    console.log('ChatResolver resolve: ', this.initialized)
    if (!this.initialized) {
      this.initStore();
    } else {
      this.handleChanges()
    }
    return of(true);
  }

  private initStore(): void {
    this.store.select(AccountState.getUser).pipe(
      filter((user) => user.id != 'not set')
    ).subscribe((user) => {
      console.log('ChatResolver load chat: ',)
      this.store.dispatch(new LoadChat())
    })
    this.initialized = true;
  }

  onServerPushMessage(event: PushMessageEvent): void {
    console.log('ChatResolver onServerPushMessage: ', event)
    // CURRENT ONLY 1 EVENT TYPE
    // if (event.type === PushMessageEvent.MESSAGE_ADDED) {
    this.messagesAdded = true;
    if (this.router.url === '/chat') {
      this.store.dispatch(new LoadChat());
    }
    // }
  }

  private handleChanges(): void {
    if (this.messagesAdded) {
      this.store.dispatch(new LoadChat());
      this.messagesAdded = false;
    }
  }
}
