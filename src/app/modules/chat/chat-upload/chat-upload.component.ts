import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-upload',
  templateUrl: './chat-upload.component.html',
  styleUrls: ['./chat-upload.component.scss']
})
export class ChatUploadComponent implements OnInit {

  @Output()
  closeUploadEvent = new EventEmitter<never>();

  @Output()
  previewMountedEvent = new EventEmitter<never>();

  @Output()
  uploadEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    console.log('init');
  }

}
