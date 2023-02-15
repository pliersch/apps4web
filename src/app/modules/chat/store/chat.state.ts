import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { clone } from "@app/common/util/obj-utils";
import { CHAT_CONSTANTS } from "@modules/chat/const";
import * as chatAction from "@modules/chat/store/chat.actions";
import { Message, MessageResultDto, UserIdentity } from "@modules/chat/store/chat.model";
import { ChatService } from "@modules/chat/store/chat.service";
import { addToUserIdentities, createMessage } from "@modules/chat/store/chat.tools";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface ChatStateModel {
  messages: Message[];
  userIdentities: UserIdentity[];
  filter: string | undefined;
  // sending: boolean;
  // sent: boolean;
}

@State<ChatStateModel>({
  name: 'Chat',
  defaults: {
    messages: [],
    userIdentities: [],
    filter: undefined,
    // sending: false,
    // sent: false,
  }
})

@Injectable()
export class ChatState {

  @Selector()
  static getMessages(state: ChatStateModel): Message[] {
    if (state.filter !== undefined) {
      return state.messages.filter(msg => msg.userId == state.filter);
    }
    return state.messages;
  }

  @Selector()
  static getUserIdentities(state: ChatStateModel): UserIdentity[] {
    return state.userIdentities;
  }

  constructor(private service: ChatService,
              private alertService: AlertService) { }

  //////////////////////////////////////////////////////////
  //          load chat
  //////////////////////////////////////////////////////////

  @Action(chatAction.LoadChat)
  loadChat(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChat): Observable<Subscription> {
    const length = ctx.getState().messages.length;
    const from = length > 0 ? length : 0;
    return this.service.loadChat('not_impl', from, CHAT_CONSTANTS.MESSAGE_LOAD_COUNT)
      .pipe(
        map((messages: MessageResultDto[]) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new chatAction.LoadChatSuccess(messages))
            }
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new chatAction.LoadChatFail(error))
            )
          )
        )
      );
  }

  @Action(chatAction.LoadChatSuccess)
  loadChatSuccess(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChatSuccess): void {
    console.log('ChatState loadChatSuccess: ', action.messageDtos)
    const state = ctx.getState();
    const messages: Message[] = [];
    const userIdentities: UserIdentity[] = [];
    for (const userIdentity of state.userIdentities) {
      userIdentities.push(clone(userIdentity));
    }
    // const userIds: UserIdentity[] = state.userIdentities.slice();
    for (const dto of action.messageDtos) {
      messages.push(createMessage(dto))
      addToUserIdentities(userIdentities, dto)
    }
    ctx.patchState({
      messages: [
        ...state.messages,
        ...messages,
      ],
      userIdentities: userIdentities
    });
  }

  @Action(chatAction.LoadChatFail)
  loadChatFail(): void {
    this.alertService.error('Load chat fail');
  }

  //////////////////////////////////////////////////////////
  //          send message
  //////////////////////////////////////////////////////////

  @Action(chatAction.SendMessage)
  sendMessage(ctx: StateContext<ChatStateModel>, action: chatAction.SendMessage): Observable<Subscription> {
    return this.service.sendMessage(action.dto)
      .pipe(
        map((message: MessageResultDto) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new chatAction.SendMessageSuccess(message))
              console.log(message)
            }
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new chatAction.SendMessageFail(error))
            )
          )
        )
      )
      ;
  }

  @Action(chatAction.SendMessageSuccess)
  sendMessageSuccess(ctx: StateContext<ChatStateModel>, action: chatAction.SendMessageSuccess): void {
    this._addMessage(ctx, action);
  }

  @Action(chatAction.SendMessageFail)
  sendMessageFail(): void {
    this.alertService.error('Send message fail');
  }

  //////////////////////////////////////////////////////////
  //                   add message
  //////////////////////////////////////////////////////////
  // via server-sent (duplicate 'sendMessageSuccess')
  @Action(chatAction.AddMessage)
  addMessage(ctx: StateContext<ChatStateModel>, action: chatAction.AddMessage): void {
    this._addMessage(ctx, action)
  }

  //////////////////////////////////////////////////////////
  //                  filter messages
  //////////////////////////////////////////////////////////

  @Action(chatAction.MessagesFilter)
  setFilter(ctx: StateContext<ChatStateModel>, action: chatAction.MessagesFilter): void {
    ctx.patchState({filter: action.filter});
  }

  //////////////////////////////////////////////////////////
  //                   helper
  //////////////////////////////////////////////////////////

  _addMessage(ctx: StateContext<ChatStateModel>, action: chatAction.AddMessage): void {
    const state = ctx.getState();
    const message = createMessage(action.dto);
    ctx.patchState({
      messages: [
        ...state.messages,
        message,
      ]
    });
    const userIdentity = action.dto.user;
    const exist = state.userIdentities.find(identity => identity.id === userIdentity.id);
    if (!exist) {
      ctx.patchState({
        userIdentities: [
          ...state.userIdentities,
          userIdentity,
        ]
      });
    }
  }
}
