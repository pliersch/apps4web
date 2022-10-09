import { Injectable } from '@angular/core';

export class PushMessageEvent {
  static META_CHANGED = 'meta_changed';
  static PHOTOS_CHANGED = 'photos_changed'
  static TAGS_CHANGED = 'tags_changed'
  type: string;
}

export interface PushMessageListener {
  onServerPushMessage(event: PushMessageEvent): void
}

interface ServerPushListener {
  handler: PushMessageListener;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerPushService {

  private listeners: ServerPushListener[] = [];

  constructor() {
    const eventSource = new EventSource('http://localhost:3000/sse');
    eventSource.onmessage = (event: MessageEvent): void => {
      this.handleMessage(event)
    }
  }

  private handleMessage(event: MessageEvent): void {
    const message: PushMessageEvent = JSON.parse(event.data);
    if ('type' in message) {
      this.emit(message);
    }
  }

  private emit(event: PushMessageEvent): void {
    this.listeners.forEach((listener) => {
      if (listener.type === event.type) {
        listener.handler.onServerPushMessage(event);
      }
    })
  }

  addListener(type: string, listener: PushMessageListener): void {
    this.listeners.push({type, handler: listener});
  }

  removeListener(type: string, listener: PushMessageListener): void {
    let instance: ServerPushListener;
    this.listeners.forEach(l => {
      if (l.handler === listener && l.type === type) {
        instance = l;
        return;
      }
    })
    this.listeners = this.listeners.filter(item => item != instance);
  }
}
