import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { animate, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserIdentity } from "@app/core/interfaces/user-identiy";
import { FinderDialogComponent } from "@modules/chat/components/finder-dialog/finder-dialog.component";
import { ChatUploadDialogComponent } from "@modules/chat/components/upload-dialog/chat-upload-dialog.component";
import { MessagesFilter, SendMessage } from "@modules/chat/store/chat.actions";
import { CreateMessageDto, Message } from "@modules/chat/store/chat.model";
import { ChatState } from "@modules/chat/store/chat.state";
import { Select, Store } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { Observable, Subscription } from "rxjs";
import { ChatInputComponent } from "./components/input/chat-input.component";
import { ChatMessagesComponent } from "./components/messages/chat-messages.component";

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
  ],
  standalone: true,
  imports: [NgScrollbar, ChatMessagesComponent, ChatInputComponent]
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

  protected resizeObserver: ResizeObserver;
  private scrollContent: Element;

  constructor(public dialog: MatDialog,
              private store: Store) { }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => this.user = res);
    this.subscription.add(
      this.userIdentities$.subscribe(res => this.userIdentities = res));
  }

  ngAfterViewInit(): void {
    this.scrollContent = this.scrollbarRef.nativeElement.querySelector('.ng-scroll-content')!;
    this.observeScrollContent();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollToEnd(): void {
    void this.scrollbarRef.scrollTo({bottom: 0, end: 0, duration: 0});
  }

  observeScrollContent(): void {
    this.resizeObserver = new ResizeObserver(res => {
      this.scrollToEnd();
    });
    this.resizeObserver.observe(this.scrollContent);
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
