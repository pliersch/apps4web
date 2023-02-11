import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import * as chatAction from "@modules/chat/store/chat.actions";
import { Message, MessageResultDto } from "@modules/chat/store/chat.model";
import { ChatService } from "@modules/chat/store/chat.service";
import { createMessage } from "@modules/chat/store/chat.tools";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface ChatStateModel {
  messages: Message[];
  filter: string | undefined;
  loading: boolean;
  loaded: boolean;
  sending: boolean;
  sent: boolean;
}

@State<ChatStateModel>({
  name: 'Chat',
  defaults: {
    messages: [],
    filter: undefined,
    loaded: false,
    loading: false,
    sending: false,
    sent: false,
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

  constructor(private service: ChatService,
              private alertService: AlertService) { }

  //////////////////////////////////////////////////////////
  //          load chat
  //////////////////////////////////////////////////////////

  @Action(chatAction.LoadChat)
  loadChat(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChat): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.service.loadChat()
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
    const messages: Message[] = [];
    for (const dto of action.messageDtos) {
      messages.push(createMessage(dto))
    }
    ctx.patchState({messages: messages, loaded: true, loading: false});
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
    ctx.patchState({sending: true});
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
    const state = ctx.getState();
    const message = createMessage(action.dto);
    ctx.patchState({
      messages: [
        ...state.messages,
        message,
      ], loaded: true, loading: false
    });
  }

  @Action(chatAction.SendMessageFail)
  sendMessageFail(): void {
    this.alertService.error('Send message fail');
  }

  //////////////////////////////////////////////////////////
  //          filter messages
  //////////////////////////////////////////////////////////

  @Action(chatAction.MessagesFilter)
  setFilter(ctx: StateContext<ChatStateModel>, action: chatAction.MessagesFilter): void {
    ctx.patchState({filter: action.filter});
  }
}
