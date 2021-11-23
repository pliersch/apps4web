import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  styleUrls: ['./chat-toolbar.component.scss']
})
export class ChatToolbarComponent implements OnInit {

  @Output()
  filterUserEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onUserSelect() {

  }
}
