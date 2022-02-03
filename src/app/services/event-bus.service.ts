import {Injectable} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  constructor() {
  }

  emit(event: EventData): void {
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
  value: any;

  constructor(name: string, value?: any) {
    this.name = name;
    this.value = value;
  }
}
