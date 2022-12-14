import { formatDate } from "@angular/common";
import parse from "date-fns/parse";
import format from 'date-fns/format'
import { de } from "date-fns/locale";

/**
 * @param date like 10. Juni 2022
 */
export function parseGerman(date: string): Date {
  return parse(date, "do MMM yyyy", new Date(), {locale: de});
}

/**
 * @param date like 04.14.2022
 */
export function parseGerman2(date: string): Date {
  return parse(date, "MM.dd.yyyy", new Date(), {locale: de});
}

export function formatEnglish(date: Date): string {
  return formatDate(date, 'longDate', 'en-US');
}

/**
 * @return string like 13.11.2000
 */
export function formatGerman(date: Date): string {
  return format(date, 'dd.MM.yyyy', {locale: de});
}

/**
 * @return string like 13. November
 */
export function formatGermanDayAndMonth(date: Date): string {
  return format(date, 'do MMMM', {locale: de});
}
