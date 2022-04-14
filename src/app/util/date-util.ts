import {formatDate} from "@angular/common";
import {WasteDate, WasteEvent} from "@modules/waste-calendar/waste-dates";

export function format(date: string): string {
  let date1 = new Date(date);
  return formatDate(date1, 'longDate', 'en-US');
}

export function formatGerman(date: Date): string {
  return formatDate(date, 'longDate', 'de-DE');
}

export function formatDates(events: WasteDate[]): WasteDate[] {
  let result: WasteDate[] = [];
  for (const event of events) {
    let s1 = format(event.date);
    let wd: WasteDate = {
      date: s1,
      type: event.type
    }
    result.push(wd)
  }
  return result;
}

export function generateWasteEvents(dates: WasteDate[]): WasteEvent[] {
  let events: WasteEvent[] = [];
  for (const event of dates) {
    events.push({
      date: new Date(event.date),
      wasteType: event.type
    });
  }
  return events;
}

