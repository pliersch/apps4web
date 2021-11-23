import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatToolbarComponent} from "@modules/chat/chat-toolbar/chat-toolbar.component";
import {EventBusService} from "@app/services";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild(ChatToolbarComponent)
  toolbar!: ChatToolbarComponent;

  constructor(private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.loadChat();
    // this.$store.dispatch('chat/loadChat').then((allMessages) => {
    //   allMessages.forEach((msg) => {
    //     this.onNewMessageAdded(msg)
    //   })
    // })
    // TODO use eventTypes const's
    this.eventBus.on('chat_message', (msg: string) => {
      this.onNewMessageAdded(msg)
    })
  }

  filterByUser($event: string) {
    console.log("filter user clicked", $event)
  }

  onScroll($event: Event) {
    console.log("scroll", $event)
  }

  scrollToEnd() {

  }

  sendMessage($event: string) {

  }

  onFileInputChange($event: string[]) {

  }

  onUploadClose() {

  }

  onPreviewMounted($event: never) {

  }

  onUploadFile($event: string) {

  }

  private loadChat() {

  }

  private onNewMessageAdded(msg: string) {

  }
}
