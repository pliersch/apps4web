import {formatDate} from "@angular/common";
import {WasteDate} from "@modules/waste-calendar/waste-dates";
import parse from "date-fns/parse";
import format from 'date-fns/format'
import {de} from "date-fns/locale";

/**
 *
 * @param date like '10. Juni 2022'
 */
export function parseGerman(date: string): Date {
  return parse(date, "do MMM yyyy", new Date(), {locale: de});
}

/**
 *
 * @param date like '04.14.2022'
 */
export function parseGerman2(date: string): Date {
  return parse(date, "MM.dd.yyyy", new Date(), {locale: de});
}

export function formatEnglish(date: Date): string {
  return formatDate(date, 'longDate', 'en-US');
}

export function formatGermanDayAndMonth(date: Date): string {
  return format(date, 'do MMMM', {locale: de});
}

export function formatDates(events: WasteDate[]): WasteDate[] {
  let result: WasteDate[] = [];
  for (const event of events) {
    let s1 = formatDate(new Date(event.date), 'longDate', 'en-US');
    let wd: WasteDate = {
      date: s1,
      type: event.type
    }
    result.push(wd)
  }
  return result;
}
