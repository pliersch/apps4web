import { Subject, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

export class EventEmitter {
  private subject$ = new Subject<Event<any>>();

  emit(name: string, payload?: any): void {
    this.subject$.next(new Event(name, payload));
  }

  on(eventName: string, callback: (val: any) => void): Subscription {
    return this.subject$.pipe(
      filter((e: Event<any>) => e.name === eventName),
      map((e: Event<any>) => e.value)).subscribe(callback);
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
