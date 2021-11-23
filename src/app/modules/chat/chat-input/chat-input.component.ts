import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  @Output()
  messageEvent = new EventEmitter<string>();
  @Output()
  fileChangeEvent = new EventEmitter<string[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
