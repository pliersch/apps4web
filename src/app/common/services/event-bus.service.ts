import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  constructor() { }

  emit(name: string, payload?: any): void {
    const event: EventData = {
      name: name,
      value: payload
    }
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      // @ts-ignore
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e.value)).subscribe(action);
  }
}

export class EventData {
  name: string;
  value?: any;

  constructor(name: string, value?: any) {
    this.name = name;
    this.value = value;
  }
}
