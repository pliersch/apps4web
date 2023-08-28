import { Component } from '@angular/core';
import { DeleteChatEntries } from "@modules/chat/store/chat.actions";
import { Store } from "@ngxs/store";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-admin-chat-overview',
    templateUrl: './admin-chat-overview.component.html',
    styleUrls: ['./admin-chat-overview.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule]
})
export class AdminChatOverviewComponent {

  constructor(private store: Store) { }

  onClickDeletePhotos(): void {
    this.store.dispatch(new DeleteChatEntries());
  }
}
