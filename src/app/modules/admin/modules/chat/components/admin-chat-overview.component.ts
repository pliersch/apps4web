import { Component } from '@angular/core';
import { DeleteChatEntries } from "@modules/chat/store/chat.actions";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-admin-chat-overview',
  templateUrl: './admin-chat-overview.component.html',
  styleUrls: ['./admin-chat-overview.component.scss']
})
export class AdminChatOverviewComponent {

  constructor(private store: Store) { }

  onClickDeletePhotos(): void {
    this.store.dispatch(new DeleteChatEntries());
  }
}
