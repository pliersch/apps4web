import {formatDate} from "@angular/common";
import {WasteDate} from "@modules/waste-calendar/waste-dates";

export function format(date: string): string {
  return formatDate(new Date(date), 'longDate', 'en-US');
}

export function formatEnglish(date: Date): string {
  return formatDate(date, 'longDate', 'en-US');
}

export function formatGerman(date: Date): string {
  // return de.formatLong.date({width:"short"});
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
