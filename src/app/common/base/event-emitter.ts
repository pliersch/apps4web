import { EventData } from "@app/common/services/event-bus.service";
import { Subject, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

export class EventEmitter {
  private subject$ = new Subject<Event<any>>();

  emit(name: string, payload?: any): void {
    this.subject$.next(new Event(name, payload));
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      // @ts-ignore
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)).subscribe(action);
  }
}

class Event<T> {
  name: string;
  value?: T;

  constructor(name: string, value?: T) {
    this.name = name;
    this.value = value;
  }
}
