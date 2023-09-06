import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DeleteChatEntries } from "@modules/chat/store/chat.actions";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-admin-chat-overview',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule]
})
export class AdminChatComponent {

  constructor(private store: Store) { }

  onClickDeletePhotos(): void {
    this.store.dispatch(new DeleteChatEntries());
  }
}
