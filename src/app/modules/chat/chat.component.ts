import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { animate, style, transition, trigger } from "@angular/animations";
import { ViewportScroller } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { FinderDialogComponent } from "@modules/chat/components/finder-dialog/finder-dialog.component";
import { ChatUploadDialogComponent } from "@modules/chat/components/upload-dialog/chat-upload-dialog.component";
import { ChatService } from "@modules/chat/services/chat.service";
import { MessagesFilter, SendMessage } from "@modules/chat/store/chat.actions";
import { CreateMessageDto, Message } from "@modules/chat/store/chat.model";
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

  @Select(ChatState.getMessages)
  messages$: Observable<Message[]>;

  @Select(ChatState.getUserIdentities)
  userIdentities$: Observable<UserIdentity[]>;
  userIdentities: UserIdentity[];

  @ViewChild(NgScrollbar)
  scrollbarRef: NgScrollbar;

  private subscription: Subscription;
  userFilter = '';

  constructor(private chatService: ChatService,
              /*private socketService: SocketService,*/
              public dialog: MatDialog,
              private scroller: ViewportScroller,
              private store: Store) {
  }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => this.user = res);
    this.subscription.add(
      this.userIdentities$.subscribe(res => this.userIdentities = res));
  }

  ngAfterViewInit(): void {
    this.messages$.subscribe(messages => {
      this.scrollToEnd();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollToEnd(): void {
    void this.scrollbarRef.scrollTo({bottom: 0, end: 0, duration: 0});
  }

  sendMessage(content: string, pictures?: File[]): void {
    const msg: CreateMessageDto = {
      userId: this.user.id,
      // chatId: this.name,
      text: content,
      pictures: pictures,
    }
    this.store.dispatch(new SendMessage(msg))
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(FinderDialogComponent, {
      data: {userIdentities: this.userIdentities},
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      this.filterByUser(res)
    });
  }

  filterByUser(filter: string): void {
    this.userFilter = filter;
    this.store.dispatch(new MessagesFilter(filter))
    this.scrollToEnd()
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(ChatUploadDialogComponent, {
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(attachment => {
      if (attachment) {
        this.sendMessage(attachment.comment, attachment.pictures)
      }
    });
  }

}
