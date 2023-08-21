import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";
import { environment } from "@environments/environment";

export class ServerSendEvent<T> {
  type: string;
  payload: T | undefined;
}

@Injectable({
  providedIn: 'root'
})
export abstract class ServerSentService<TEvents extends Record<string, any>> {

  private emitter: EventEmitter<any> = new EventEmitter<any>();

  protected abstract getServerEvents(): string[];

  protected constructor() {
    this.setup()
  }

  private setup(): void {
    for (const eventType of this.getServerEvents()) {
      const source = new EventSource(`${environment.apiUrl}/${eventType}/sse`);
      source.onmessage = (event: MessageEvent): void => {
        const send: ServerSendEvent<any> = JSON.parse(event.data);
        this.emitter.emit(send.type, send.payload);
      }
    }
  }

  on<TEventName extends keyof TEvents & string>(eventName: TEventName, callback: (eventArg: TEvents[TEventName]) => void): void {
    this.emitter.on(eventName, callback);
  }

  once<TEventName extends keyof TEvents & string>(eventName: TEventName, callback: (eventArg: TEvents[TEventName]) => void): void {
    this.emitter.once(eventName, callback);
  }

  off<TEventName extends keyof TEvents & string>(eventName: TEventName, callback: (eventArg: TEvents[TEventName]) => void): void {
    this.emitter.off(eventName, callback);
  }

}
