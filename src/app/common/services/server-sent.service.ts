import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

export class PushMessageEvent<T> {
  static PHOTOS_ADDED = 'photos_added';
  static PHOTOS_CHANGED = 'photos_changed';
  static TAGS_CHANGED = 'tags_changed';
  static MESSAGE_ADDED = 'message_added';
  static VISIT_ADDED = 'visit_added';

  type: string;
  payload: T | undefined;


  constructor(type: string, payload?: T) {
    this.type = type;
    this.payload = payload;
  }
}

export interface PushMessageListener {
  onServerPushMessage(event: PushMessageEvent<never>): void
}

interface ServerPushListener {
  handler: PushMessageListener;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerSentService {

  private listeners: ServerPushListener[] = [];

  constructor() {
    this.setup()
  }

  private setup(): void {
    const eventTypes = ['photos', 'tags', 'chat', 'user'];
    for (const eventType of eventTypes) {
      const source = new EventSource(`${environment.apiUrl}/${eventType}/sse`);
      source.onmessage = (event: MessageEvent): void => {
        this.handleServerSent(event)
      }
    }
  }

  private handleServerSent(event: MessageEvent): void {
    const message: PushMessageEvent<never> = JSON.parse(event.data);
    if ('type' in message) {
      this.emit(message);
    }
  }

  private emit(event: PushMessageEvent<never>): void {
    this.listeners.forEach((listener) => {
      if (listener.type === event.type) {
        listener.handler.onServerPushMessage(event);
      }
    })
  }

  addListener(type: string, listener: PushMessageListener): void {
    this.listeners.push({type, handler: listener});
  }

  // there is no reason for removing !?!
  // removeListener(type: string, listener: PushMessageListener): void {
  //   let instance: ServerPushListener;
  //   this.listeners.forEach(l => {
  //     if (l.handler === listener && l.type === type) {
  //       instance = l;
  //       return;
  //     }
  //   })
  //   this.listeners = this.listeners.filter(item => item != instance);
  // }
}
