import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
// TODO extract to animation module?!
import { animate, style, transition, trigger } from "@angular/animations";
import { ViewportScroller } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatToolbarComponent } from "@modules/chat/components/toolbar/chat-toolbar.component";
import { MessagesFilter, SendMessage } from "@modules/chat/store/chat.actions";
import { ChatImage, CreateMessageDto, Message } from "@modules/chat/store/chat.model";
import { ChatService } from "@modules/chat/store/chat.service";
import { ChatState } from "@modules/chat/store/chat.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})

export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;

  // TODO same selector, why?
  @Select(ChatState.getMessages)
  messages$: Observable<Message[]>;

  // TODO same selector, why?
  @Select(ChatState.getMessages)
  filteredMessages$: Observable<Message[]>;

  private content = '';
  userFilter = '';
  private subscription: Subscription;

  showPreview = false;
  fileList: FileList;

  @ViewChild(ChatToolbarComponent)
  toolbar: ChatToolbarComponent;

  @ViewChild(NgScrollbar)
  scrollbarRef: NgScrollbar;

  constructor(private chatService: ChatService,
              private scroller: ViewportScroller,
              private store: Store) {
  }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => this.user = res);
    // this.eventBus.emit(new EventData('current-module', ChatToolbarComponent));
    // this.totalChatHeight = this.$refs.chatContainer.scrollHeight
    // this.loading = false

    // messages.forEach((msg: Message) => {
    //     this.onNewMessageAdded(msg)
    //   })
  }

  ngAfterViewInit(): void {
    this.messages$.subscribe(messages => {
      this.scrollToEnd();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.actionBarService.removeActions();
  }

  filterByUser(filter: string): void {
    this.userFilter = filter;
    this.store.dispatch(new MessagesFilter(filter))
    this.scrollToEnd()
  }

  filterMessages(): Observable<Message[]> {
    // if (this.userFilter !== '') {
    //   return this.chatMessages.filter((msg) => msg.userName === this.userFilter)
    // }
    return this.messages$;
  }

  onScroll($event: Event): void {
    console.log("scroll", $event)
  }

  scrollToEnd(): void {
    void this.scrollbarRef.scrollTo({bottom: 0, end: 0, duration: 300});
    // this.$nextTick(() => {
    //   this.$refs.scroll.$el.scrollTop = this.$refs.chatContainer.scrollHeight
    //   // const options = {
    //   //   duration: 300,
    //   //   offset: 0
    //   //   // easing: this.easing,
    //   // }
    //
    //   // this.$vuetify.goTo(900, options)
    //   const container = this.$refs.chatContainer
    //   container.scrollTop = 500
    //   // container.offsetTop = 500
    //   // container.scrollTop = container.scrollHeight
    //   console.log('scrollHeight', container.scrollHeight)
    //   // console.log('scrollTop', container.scrollTop)
    // })
  }

  scrollTo(): void {
    console.log('scroll to')
    // this.$nextTick(() => {
    //   const currentHeight = this.$refs.chatContainer.scrollHeight
    //   const difference = currentHeight - this.totalChatHeight
    //   const container = this.$el.querySelector('.chat-container')
    //   container.scrollTop = difference
    // })
  }

  private onNewMessageAdded(msg: Message): void {
    console.log('ChatComponent onNewMessageAdded: ')

    // this.messages.push(msg);

    // if (msg.text !== undefined) {
    //   const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
    //   msg.text = msg.text
    //     .replace(/&/g, '&amp;')
    //     .replace(/</g, '&lt;')
    //     .replace(/>/g, '&gt;')
    //     .replace(/"/g, '&quot;')
    //     .replace(/'/g, '&#039;')
    //   msg.text = msg.text.replace(urlPattern, "<a href='$1'>$1</a>")
    // }
    // this.chatMessages.push(this.processMessage(msg))
    // this.scrollToEnd()
  }

  sendMessage(content: string, pictures?: File[]): void {
    const msg: CreateMessageDto = {
      userId: this.user.id,
      // chatId: this.name,
      text: content,
      pictures: pictures || [],
    }
    // if (file) {
    //   msg.image = file
    // }
    // SocketManager.getInstance(this).sendMessage(msg)
    // this.chatService.sendMessage(msg).subscribe(res => {
    //   console.log('ChatComponent : ', res)
    // });
    this.store.dispatch(new SendMessage(msg))
  }

  onFileInputChange(fileList: FileList): void {
    this.showPreview = true
    console.log('ChatComponent onFileInputChange: ')
    this.fileList = fileList;

    // let file = e.target.files[0];
    //   if (file) {
    //     console.log(file)
    //     this.fileName = file.name;
    //     const formData = new FormData();
    //     formData.append("thumbnail", file);
    //     this.fileChangeEvent.emit(e.target.files);
    //     // const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //     // upload$.subscribe();
    //   }
  }

  onUploadClose(): void {
    this.showPreview = false
    // this.$refs.input.reset()
  }

  onPreviewMounted($event: never): void {
    // this.$refs.preview.handleFiles(this.fileList);
  }

  onUploadFile(chatImage: ChatImage): void {
    this.showPreview = false
    const formData = new FormData()
    // @ts-ignore
    formData.append('chatimage', chatImage.images[0])
    this.sendMessage(chatImage.comment, chatImage.images)
  }

  processMessage(message: Message): Message {
    const imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
    if (imageRegex.test(message.text)) {
      // @ts-ignore
      message.image = imageRegex.exec(message.text)[0];
    }
    // const emojiRegex = /([\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{2934}-\u{1f18e}])/gu
    // if (emojiRegex.test(message.content)) {
    //   message.content = message.content.replace(emojiRegex, '<span class="emoji">$1</span>')
    // }
    return message
  }

  toggleTmp($event: boolean): void {
    this.showPreview = $event;
  }

}
