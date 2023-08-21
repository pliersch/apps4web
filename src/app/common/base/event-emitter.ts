import { EventEmitter as NodeEventEmitter } from 'events'

export interface IEventEmitter<TEvents extends Record<string, any>> {
  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    eventArg?: TEvents[TEventName])
    : void;

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void;

  once<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void;

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void;
}

export class EventEmitter<TEvents extends Record<string, any>> {
  private emitter = new NodeEventEmitter();

  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    eventArg?: TEvents[TEventName]
  ): void {
    this.emitter.emit(eventName, eventArg);
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void {
    this.emitter.on(eventName, handler as any);
  }

  once<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void {
    this.emitter.once(eventName, handler as any);
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (eventArg: TEvents[TEventName]) => void
  ): void {
    this.emitter.off(eventName, handler as any);
  }
}
