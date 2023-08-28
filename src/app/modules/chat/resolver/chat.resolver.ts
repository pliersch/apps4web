import { AccountState } from "@account/store/account.state";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChatSseService } from "@modules/chat/services/chat-sse.service";
import { AddMessage, LoadChat } from "@modules/chat/store/chat.actions";
import { MessageResultDto } from "@modules/chat/store/chat.model";
import { Store } from "@ngxs/store";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatResolver  {

  private initialized = false;
  private newMessagesAdded = false;

  constructor(private store: Store,
              private chatSseService: ChatSseService,
              private router: Router) {
    this.chatSseService.on("message_added", (data) => this.onMessageAdded(data));
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
    this.store.dispatch(new LoadChat());
    this.initialized = true;
  }

  onMessageAdded(msg: MessageResultDto): void {
    if (this.isChatOpen() && this.isFromOtherUser(msg.user.id)) {
      this.store.dispatch(new AddMessage(msg));
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
    return this.router.url.includes('/chat');
  }

  private isFromOtherUser(userId: string): boolean {
    return userId != this.store.selectSnapshot(AccountState.getUser)!.id;
  }
}
