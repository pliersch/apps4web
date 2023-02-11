import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrls: ['./chat-toolbar.component.scss']
})
export class ChatToolbarComponent {

  private toggle = false;

  @Output()
  filterUserEvent = new EventEmitter<string>();

  constructor() {
  }

  onUserSelect(): void {
    if (this.toggle) {
      this.filterUserEvent.emit('User 10');
    } else {
      this.filterUserEvent.emit(undefined);
    }
    this.toggle = !this.toggle;
  }
}
