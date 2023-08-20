import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { PushMessageEvent, PushMessageListener, ServerSentService } from "@app/common/services/server-sent.service";
import { AddMessage, LoadChat } from "@modules/chat/store/chat.actions";
import { MessageResultDto } from "@modules/chat/store/chat.model";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatResolver implements PushMessageListener, Resolve<boolean> {

  private initialized = false;
  private newMessagesAdded = false;
  private user: User;

  constructor(private store: Store,
              private serverSentService: ServerSentService,
              private router: Router) {
    this.serverSentService.addListener(PushMessageEvent.MESSAGE_ADDED, this);
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
    this.store.select(AccountState.getUser).pipe(
      filter((user) => user != null)
    ).subscribe((user) => {
      this.user = user!;
      this.store.dispatch(new LoadChat())
    })
    this.initialized = true;
  }

  onServerPushMessage(event: PushMessageEvent<MessageResultDto>): void {
    if (this.isChatOpen() && this.isFromOtherUser(event)) {
      this.store.dispatch(new AddMessage(event.payload!));
    } else {
      this.newMessagesAdded = true;
    }
  }

  private handleChanges(): void {
    if (this.newMessagesAdded) {
      this.store.dispatch(new LoadChat());
      this.newMessagesAdded = false;
    }
  }

  private isChatOpen(): boolean {
    return this.router.url === '/chat';
  }

  private isFromOtherUser(event: PushMessageEvent<MessageResultDto>): boolean {
    return event.payload!.user.id != this.user.id;
  }
}
