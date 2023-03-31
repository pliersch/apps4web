import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { Observable } from "rxjs";

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrls: ['./chat-toolbar.component.scss']
})
export class ChatToolbarComponent {

  private toggle = false;

  @Input()
  userIdentities$: Observable<UserIdentity[]>

  @Output()
  filterUserEvent = new EventEmitter<string>();

  selected: UserIdentity;

  onClickFilter(): void {
    if (this.toggle) {
      this.filterUserEvent.emit('User 10');
    } else {
      this.filterUserEvent.emit(undefined);
    }
    this.toggle = !this.toggle;
  }

  onChangeSelection(): void {
    const id = this.selected ? this.selected.id : undefined;
    this.filterUserEvent.emit(id);
  }
}
