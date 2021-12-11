import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import * as chatAction from "@modules/chat/store/chat.actions";
import {Message} from "@modules/chat/models/message";
import {ChatService} from "@modules/chat/store/chat.service";

export interface ChatStateModel {
  messages: Message[];
  loading: boolean;
  loaded: boolean;
  sending: boolean;
  sent: boolean;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
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
    return state.messages;
  }

  constructor(private service: ChatService) {
  }

  //////////////////////////////////////////////////////////
  //          load chat
  //////////////////////////////////////////////////////////

  @Action(chatAction.LoadChat)
  loadChat(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChat): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.service.loadChat()
      .pipe(
        map((messages: Message[]) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new chatAction.LoadChatSuccess(messages))
              console.log(messages)
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
      )
      ;
  }

  @Action(chatAction.LoadChatSuccess)
  loadChatSuccess(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChatSuccess): void {
    ctx.patchState({messages: action.messages, loaded: true, loading: false});
  }

  @Action(chatAction.LoadChatFail)
  loadChatFail(ctx: StateContext<ChatStateModel>, action: chatAction.LoadChatFail): void {
    ctx.dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          send message
  //////////////////////////////////////////////////////////

  @Action(chatAction.SendMessage)
  sendMessage(ctx: StateContext<ChatStateModel>, action: chatAction.SendMessage): Observable<Subscription> {
    ctx.patchState({sending: true});
    return this.service.sendMessage(action.message)
      .pipe(
        map((message: Message) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new chatAction.SendMessageSuccess(message))
              console.log(message)
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
      )
      ;
  }

  @Action(chatAction.SendMessageSuccess)
  sendMessageSuccess(ctx: StateContext<ChatStateModel>, action: chatAction.SendMessageSuccess): void {
    const state = ctx.getState();
    ctx.patchState({
      messages: [
        ...state.messages,
        action.message,
      ], loaded: true, loading: false
    });
  }

  @Action(chatAction.SendMessageFail)
  sendMessageFail({dispatch}: StateContext<ChatStateModel>, action: chatAction.SendMessageFail): void {
    // TODO handle error!
    console.log(action.error)
    dispatch({loaded: false, loading: false});
  }
}
